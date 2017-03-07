# memory-queue-data-bus
- MemoryQueueDataBusのTypeScript用の実装を提供します
- Node.jsで利用することを想定しています

## Setup
### package.json
```
    "dependencies": {
        "@cross-border-bridge/memory-queue-data-bus": "~2.0.0"
    },
```

## Usage
#### step 1: import

```typescript
import * as mq from "@cross-border-bridge/memory-queue";
import * as db from "@cross-border-bridge/memory-queue-data-bus";
```

#### step 2: 2本のMemoryQueueを準備
送信口となるMemoryQueue, 受信口となるMemoryQueueを準備します。

```typescript
    var mq1 = new mq.MemoryQueue();
    var mq2 = new mq.MemoryQueue();
```

#### step 3: MemoryQueueDataBusを準備
- `mq1` と `mq2` を指定したMemoryQueueDataBusを準備します
- 片方のMemoryQueueDataBusは, `mq1` を送信口, `mq2` を受信口として設定します
- もう片方のMemoryQueueDataBusは, `mq2` を送信口, `mq1` を受信口として設定します

```typescript
    var dataBus1 = new db.MemoryQueueDataBus(mq1, mq2);
    var dataBus2 = new db.MemoryQueueDataBus(mq2, mq1);
```

#### step 4: `dataBus1` から送信したデータを `dataBus2` で受信する
```typescript
    // dataBus2にdataBus1から送信したデータを受信するハンドラを設定
    dataBus2.addHandler(function() {
        console.log("Data received: " + JSON.stringify(arguments));
    });

    // dataBus1からdataBus2にデータを送信
    dataBus1.send("Hello", "world");
```

#### step 5: 破棄
```typescript
    dataBus1.destroy();
    dataBus2.destroy();
```

## License
- Source code, Documents: [MIT](LICENSE)
- Image files: [CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/)
