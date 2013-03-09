function azureQueueTest(request, response)
{
	var test= url.parse(request.url).path;
	console.log(test);
	var queuename= 'myqueue';

	if(test='CREATE')
	{
		createQueueTest(queuename);
		console.log("queue created...");
	}

	if(test= 'SEND') 
	{
		sendMessageTest(queuename);
		console.log('enqueing message...');
	} 

	if(test= 'RECEIVE')
	{
		receiveMessageTest(queuename);
	}
	
	response.end();
}

function createQueueTest(queuename)
{
     serviceBusService.createQueueIfNotExists(queuename,  function(error){
        if(!error){
           console.log('queue created...');
		}
	})
}

function sendMessageTest(queue)
{
	var message = {
		body: 'Test message',
		customProperties: {
			testproperty: 'TestValue'
		}}
		
		serviceBusService.sendQueueMessage(queue, message, function(error){
        if(!error){
           console.log('queue created...');
		}})
}

serviceBusService.receiveQueueMessage('taskqueue', function(error, receivedMessage){
    if(!error){
        // Message received and deleted
    }
});
serviceBusService.receiveQueueMessage(queueName, { isPeekLock: true }, function(error, lockedMessage){
    if(!error){
        // Message received and locked
        serviceBusService.deleteMessage(lockedMessage, function (deleteError){
            if(!deleteError){
                // Message deleted
            }
        }
    }
});

process.env.AZURE_SERVICEBUS_NAMESPACE= "geenid";
process.env.AZURE_SERVICEBUS_ACCESS_KEY= "Bt0RlwPVgzug4Rizbf9UjMUel1vH5yOxOUx5R+jb9+I=";

var url = require('url');
var azure = require('azure');
var serviceBusService = sb.createServiceBusService();

var http = require('http')
var port = process.env.PORT || 1337;
var server = http.createServer(azureQueueTest);
console.log('service listening at localhost:' + port + '...');
server.listen(port); 