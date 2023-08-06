import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  region: 'ca-central-1',
  // Add your AWS credentials here if not using IAM roles
  accessKeyId: 'AKIA4DSZ6XPBXBTFZKVY',
  secretAccessKey: '0WQtuyTJGnV9Ugv1IrcTh4J8mYSZz1Df9M9pjnfV',
  dynamoDbCrc32: false
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

export { dynamoDB, s3 };
