import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';

import mongoose, { Schema } from 'mongoose'

const db = mongoose.createConnection("mongodb://mongo:AN6GA2LtenmKCX1T6XRl@containers-us-west-31.railway.app:7330/test?authSource=admin")

const TestSchema = new Schema({
  name: String
})

const TestModel = db.model('Test', TestSchema)

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    
    TestModel.create({
      name: 'Sera'
    }).then((doc) => {
      console.log("doc", doc)

      db.close()
    })

    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true
    });
  }
}