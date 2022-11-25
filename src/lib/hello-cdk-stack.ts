import * as cdk from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement} from 'aws-cdk-lib/aws-iam';
export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps, environmentFromBin?: any | undefined) {
    super(scope, id, props);


    console.log("environmentFromBin", environmentFromBin)

    const eventProducerLambda = new Function(this, 'helloLambdaFunction', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset("dist"),
      handler: "helloLambda.handler",
      environment: environmentFromBin,
    });

    const eventPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      resources: ["*"],
      actions: ["events:PutEvents"],
    });

    eventProducerLambda.addToRolePolicy(eventPolicy);
    
    new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true
    });
  }
}