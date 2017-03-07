// Copyright © 2017 DWANGO Co., Ltd.

import * as mq from "@cross-border-bridge/memory-queue";
import * as db from "@cross-border-bridge/data-bus";

export class MemoryQueueDataBus implements db.DataBus {
    private _sender: mq.MemoryQueue;
    private _receiver: mq.MemoryQueue;
    private _handlers: db.DataBusHandler[];

    constructor(sender: mq.MemoryQueue, receiver: mq.MemoryQueue) {
        this._sender = sender;
        this._receiver = receiver;
        this._handlers = [];
        var _this = this;
        this._receiver.setHandler(function() {
            for (let h of _this._handlers) {
                h.apply(_this, arguments);
            }
        });
    }

    send(...data: any[]): void {
        this._sender.send.apply(this._sender, data);
    }

    addHandler(handler: db.DataBusHandler): void {
        this._handlers.push(handler);
    }

    removeHandler(handler: db.DataBusHandler): void {
        var i = this._handlers.indexOf(handler);
        if (i < 0) return;
        this._handlers.splice(i, 1);
    }

    removeAllHandlers(): void {
        this._handlers = [];
    }

    destroy(): void {
        this.removeAllHandlers();
        this._receiver.setHandler(undefined);
    }
}
