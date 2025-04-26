const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configure AWS SDK
AWS.config.update({ region: 'us-east-1' }); // Change this to your preferred region

const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();
const acm = new AWS.ACM();
const route53 = new AWS.Route53();

const BUCKET_NAME = 'bradderzeats.co.uk'; // Change this to your desired bucket name
const DOMAIN_NAME = 'bradderzeats.co.uk'; // Change this to your domain
const CERTIFICATE_DOMAIN = `*.${DOMAIN_NAME}`;

async function createS3Bucket() {
  try {
    await s3.createBucket({
      Bucket: BUCKET_NAME,
      ACL: 'private'
    }).promise();

    // Enable static website hosting
    await s3.putBucketWebsite({
      Bucket: BUCKET_NAME,
      WebsiteConfiguration: {
        IndexDocument: { Suffix: 'index.html' },
        ErrorDocument: { Key: 'index.html' }
      }
    }).promise();

    // Set bucket policy for CloudFront
    const bucketPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Sid: 'AllowCloudFrontServicePrincipal',
          Effect: 'Allow',
          Principal: {
            Service: 'cloudfront.amazonaws.com'
          },
          Action: 's3:GetObject',
          Resource: `arn:aws:s3:::${BUCKET_NAME}/*`,
          Condition: {
            StringEquals: {
              'AWS:SourceArn': `arn:aws:cloudfront::${AWS.config.credentials.accountId}:distribution/*`
            }
          }
        }
      ]
    };

    await s3.putBucketPolicy({
      Bucket: BUCKET_NAME,
      Policy: JSON.stringify(bucketPolicy)
    }).promise();

    console.log('S3 bucket created and configured successfully');
  } catch (error) {
    console.error('Error creating S3 bucket:', error);
    throw error;
  }
}

async function requestCertificate() {
  try {
    const certificate = await acm.requestCertificate({
      DomainName: DOMAIN_NAME,
      SubjectAlternativeNames: [CERTIFICATE_DOMAIN],
      ValidationMethod: 'DNS'
    }).promise();

    console.log('Certificate requested. Please add the following DNS records to validate the certificate:');
    const validationRecords = await acm.describeCertificate({
      CertificateArn: certificate.CertificateArn
    }).promise();

    return certificate.CertificateArn;
  } catch (error) {
    console.error('Error requesting certificate:', error);
    throw error;
  }
}

async function createCloudFrontDistribution(certificateArn) {
  try {
    const distribution = await cloudfront.createDistribution({
      DistributionConfig: {
        CallerReference: Date.now().toString(),
        Comment: 'Bradders Eats UI Distribution',
        DefaultCacheBehavior: {
          TargetOriginId: 'S3Origin',
          ViewerProtocolPolicy: 'redirect-to-https',
          AllowedMethods: ['GET', 'HEAD'],
          CachedMethods: ['GET', 'HEAD'],
          ForwardedValues: {
            QueryString: false,
            Cookies: { Forward: 'none' }
          },
          MinTTL: 0,
          DefaultTTL: 86400,
          MaxTTL: 31536000
        },
        Enabled: true,
        Origins: [
          {
            Id: 'S3Origin',
            DomainName: `${BUCKET_NAME}.s3.amazonaws.com`,
            S3OriginConfig: {
              OriginAccessIdentity: ''
            }
          }
        ],
        Aliases: {
          Quantity: 1,
          Items: [DOMAIN_NAME]
        },
        ViewerCertificate: {
          ACMCertificateArn: certificateArn,
          SSLSupportMethod: 'sni-only',
          MinimumProtocolVersion: 'TLSv1.2_2021'
        }
      }
    }).promise();

    console.log('CloudFront distribution created successfully');
    return distribution.Distribution.DomainName;
  } catch (error) {
    console.error('Error creating CloudFront distribution:', error);
    throw error;
  }
}

async function deploy() {
  try {
    // Build the React app
    console.log('Building React app...');
    execSync('npm run build', { stdio: 'inherit' });

    // Create S3 bucket
    await createS3Bucket();

    // Upload build files to S3
    console.log('Uploading files to S3...');
    const buildDir = path.join(__dirname, '../build');
    const uploadDir = async (dir) => {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          await uploadDir(filePath);
        } else {
          const relativePath = path.relative(buildDir, filePath);
          await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: relativePath,
            Body: fs.readFileSync(filePath),
            ContentType: getContentType(file)
          }).promise();
        }
      }
    };
    await uploadDir(buildDir);

    // Request ACM certificate
    const certificateArn = await requestCertificate();

    // Create CloudFront distribution
    const distributionDomain = await createCloudFrontDistribution(certificateArn);

    console.log('Deployment completed successfully!');
    console.log(`Your website will be available at: https://${DOMAIN_NAME}`);
    console.log('Please wait for the CloudFront distribution to be deployed (this may take 15-30 minutes)');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

function getContentType(file) {
  const ext = path.extname(file).toLowerCase();
  const contentTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };
  return contentTypes[ext] || 'application/octet-stream';
}

deploy(); 