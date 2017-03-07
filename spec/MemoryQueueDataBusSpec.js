describe("MemoryQueueDataBusSpec", function() {
    var mq = require("@cross-border-bridge/memory-queue");
    var db = require("../lib/index.js");

    it("test", function() {
        var mq1 = new mq.MemoryQueue();
        var mq2 = new mq.MemoryQueue();
        var dataBusS = new db.MemoryQueueDataBus(mq1, mq2);
        var dataBusR = new db.MemoryQueueDataBus(mq2, mq1);

        var counter = 0;
        var receivedData;

        var handler = function() {
            console.log("Received data: " + JSON.stringify(arguments));
            counter++;
            receivedData = arguments;
        }

        dataBusR.addHandler(handler);

        receivedData = undefined;
        counter = 0;
        dataBusS.send("This", "Is", "Test");
        expect(1).toEqual(counter);
        expect(3).toEqual(receivedData.length);
        expect("This").toEqual(receivedData[0]);
        expect("Is").toEqual(receivedData[1]);
        expect("Test").toEqual(receivedData[2]);

        dataBusR.removeHandler(handler);

        receivedData = undefined;
        counter = 0;
        dataBusS.send("This", "Is", "Test");
        expect(0).toEqual(counter);
        expect(receivedData).toBeUndefined();

        dataBusR.removeHandler(handler);
        dataBusS.destroy();
        dataBusR.destroy();
    });
});