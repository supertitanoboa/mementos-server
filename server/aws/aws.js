var AWS = require('aws-sdk');
var express = require('express');
var uuid = require('uuid');
var aws = {};
var objectId;
var return_data;
var s3_params;
var s3;

aws.s3Router = express.Router();

aws.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
aws.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
aws.S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;

aws.s3Router.get('*', function(req, res){
  'use strict';
  AWS.config.update({accessKeyId: aws.AWS_ACCESS_KEY_ID, secretAccessKey: aws.AWS_SECRET_ACCESS_KEY});

  objectId = uuid.v4();
  s3 = new AWS.S3();

  console.log('req.query', req.query);

  s3_params = {
    Bucket: aws.S3_BUCKET_NAME,
    Key: objectId,
    Expires: 60,
    ContentType: req.query.s3_object_type,
    ACL: 'bucket-owner-full-control'
  };

  s3.getSignedUrl('putObject', s3_params, function(err, data){
    if(err){
      console.log(err);
    }
    else{
      return_data = {
        signed_request: data,
        url: 'https://' + aws.S3_BUCKET_NAME + '.s3.amazonaws.com/' + objectId
      };
      console.log('return_data : ', return_data);
      res.write(JSON.stringify(return_data));
      res.end();
    }
  });

});

module.exports = aws;
