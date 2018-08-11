# A ChatRoom With Topic Discovery Based on Locations

Follow this README to build your forum chat room with the help of PubNub ChatEngine and AWS Comprehend. This forum chat room, provides the functionality of a chat room with the ability to suggest topics based on locations. 

This repository contains the demo application for this forum chat room, along with a simulated chat session between a groupl of users. The source code for this chat app is in Javascript. Some level of familiarity with NodeJS, JQuery and standard Javascript language is expected.
 
For reference, you can check the documentation of [PubNub Chat Engine](https://www.pubnub.com/products/chatengine/), [PubNub Functions](https://www.pubnub.com/products/functions/) and [AWS Comprehend](https://aws.amazon.com/comprehend/), which are the main components of this app. 


Here is how the simulated chat session runs. It is depicting a public health advisory chat room about Zika Virus, and it generates "HeatTags" for all the locations mentioned in the chat messages. This indirectly indicates the impact and spread of Zika Virus in those locations. 

-----APP SCREENSHOT------

You can follow the sections below to build this example chat app in no time. However, before you begin, you must have an account in PubNub and AWS.

Create your [PubNub developer account](https://admin.pubnub.com/)

Create your free [AWS account](https://portal.aws.amazon.com/billing/signup#/start)

## [Set Up Basic ChatEngine](#set-up-basic-chatengine)

First, you need to set up the ChatEngine enabled PubNub app in your account. 

### Step 1 : Login to your [PubNub App Console](https://admin.pubnub.com)


### Step 2 : Activate ChatEngine in your PubNub account

Follow these steps in [ChatEngine QuickStart Tutorial](https://www.pubnub.com/docs/tutorials/chatengine#step-one-pubnub-keys) to set up your chat app instance. Check the first step "Configure Your Account" in quickstart tutorial and click on the setup button.

### Step 3 : Wait for a few seconds. Once done, you will get a new PubNub app created within your account with a new set of publish and subscribe keys. 

<img src="screenshots/step3-chatengine-activation.png" width="400">

### Step 4 : Check that a new app is created in your PubNub admin dashboard.

<img src="screenshots/step4-chatengine-app-creation.png" width="800">

Now your app infrastucture is created. Head over to the next section for setting up AWS Comprehend.

## [Set Up AWS Comprehend Service](#set-up-aws-comprehend-service)

Follow these steps to setup your AWS Comprehend service

### Step 1 : Setup an IAM user to access AWS Translate service

Follow [these steps](https://docs.aws.amazon.com/comprehend/latest/dg/setting-up.html) to create an IAM user for AWS Translate. Make sure that the IAM user has full permissions for accessing AWS Comprehend service.

### Step 2 : Download the IAM user credentials

Download the credentials file for the IAM user and save it. This file contains the AWS ACCESS KEY and AWS SECRET KEY.

--IMG--

## [Set Up PubNub Function for AWS Comprehend](#set-up-pubnub-function-for-aws-comprehend)

Follow these steps to setup PubNub Function to serve as the backend for the forum chat app.

### Step 1 : Setup PubNub Function

Head over to your PubNub dashboard and select the "ChatEngine App" app. Follow the official document of [PubNub Function](https://www.pubnub.com/products/functions/) to create a function for this app by clicking on the "Functions" menu on the sidebar.

<img src="screenshots/step1-pubnubfunction.png" width="800">

### Step 2 : Deploy the function

Use the following parameters for creating the module and function

<img src="screenshots/step2-create-module.png" width="350"><img src="screenshots/step2-create-function.png" width="350">

### Step 3 : Launch the function

Copy the [AWS Comprehend backend code](https://github.com/shyampurk/ChatEngineWithAWSTranslate/blob/master/function/AWS%20Transalte%20backend.js) and paste it in the code window. 

Add your AWS ACCESS KEY and AWS SECRET KEY (Step 2 of "Set Up AWS Translate Service") in the My Secrets vault as shown below. 

<img src="screenshots/step3-addSecrets.png" width="800">

Now you can launch the function. 

## [App Deployment and Running The Simulated Chat Session](#app-deployment-and-running-the-simulated-chat-session)

Follow these steps to test the app.

### Step 1 : Clone this repository

Clone this repository under a local folder

### Step 2 : Update PubNub keys

Update the PubNub publish key for both the chat app instances for [John](https://github.com/shyampurk/ChatEngineWithAWSTranslate/blob/master/app/userJohn/scripts/chatTranslate.js#L3) and [Peter](https://github.com/shyampurk/ChatEngineWithAWSTranslate/blob/master/app/userPeter/scripts/chatTranslate.js#L3).

Repeat the same steps for updating the PubNub subscribe key for [John](https://github.com/shyampurk/ChatEngineWithAWSTranslate/blob/master/app/userJohn/scripts/chatTranslate.js#L4) and [Peter](https://github.com/shyampurk/ChatEngineWithAWSTranslate/blob/master/app/userPeter/scripts/chatTranslate.js#L4).

### Step 3 : Launch the app instances

Now you can launch both the chat app instances for John and Peter and start chatting. Remember, the translation feature is only enabled for Peter while John can chat only in English. This is because AWS Translate currently supports translation to and from English only.

<img src="screenshots/overallscreencast.gif" width="800">

Have fun!

