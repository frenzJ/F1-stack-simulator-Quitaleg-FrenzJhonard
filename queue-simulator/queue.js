
class Queue {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to the rear of the queue
    enqueue(element) {
        this.items[this.count] = element
        this.count += 1
        return `${element}`
    }

    // Return and remove the front element in queue
    // Return undefined if queue is empty
    dequeue() {
        if(this.count == 0) return undefined
        let deleteItem = this.items.shift()
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
    }

    // Check front element in queue
    peek() {
        console.log(`Front element is ${this.items[0]}`)
        return this.items[0]
    }

    // Check if queue is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Queue is empty' : 'Queue is NOT empty')
        return this.count == 0
    }

    // Check size of queue
    size() {
        console.log(`${this.count} elements in queue`)
        return this.count
    }

    // Print elements in queue (front to rear)
    print() {
        let str = ''
        for(let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear queue
    clear() {
        this.items = []
        this.count = 0
        console.log('Queue cleared..')
        return this.items
    }
}

const queue = new Queue()

// Show a message under the simulator
function showMessage(text) {
    $("#message").text(text);
}

// Redraw the queue blocks. Front is first (top), rear is last (bottom).
function renderQueue() {
    $("#queue").empty();
    const last = queue.count - 1;
    for (let i = 0; i < queue.count; i++) {
        const color = (i % 2 == 0) ? "bg-primary" : "bg-success";
        const $block = $("<div>").addClass(`row ${color} push`);
        let tag = "";
        if (i == 0 && i == last) tag = "FRONT / REAR";
        else if (i == 0) tag = "FRONT";
        else if (i == last) tag = "REAR";
        if (tag !== "") {
            $("<small>").addClass("tag").text(tag).appendTo($block);
        }
        $("<span>").text(queue.items[i]).appendTo($block);
        $("#queue").append($block);
    }
}

$(document).ready(function(){
    // Enqueue: add the typed value to the rear
    $("#enqueueBtn").on("click", function(){
        const value = $("#dataInput").val().trim();
        if (value === "") {
            showMessage("Please type a value first.");
            return;
        }
        queue.enqueue(value);
        $("#dataInput").val("").focus();
        showMessage("");
        renderQueue();
    });

    // Dequeue: remove the front and show it in the deleted area
    $("#dequeueBtn").on("click", function(){
        if (queue.count == 0) {
            showMessage("The queue is empty. Nothing to dequeue.");
            return;
        }
        const removed = queue.dequeue();
        $("#deleted").append($("<div>").addClass("row pop text-bg-danger border border-light").text(removed));
        showMessage("");
        renderQueue();
    });

    // Peek: highlight the front without removing it
    $("#peekBtn").on("click", function(){
        if (queue.count == 0) {
            showMessage("The queue is empty. Nothing to peek.");
            return;
        }
        showMessage("");
        const $front = $("#queue .push").first();
        $front.addClass("highlight");
        setTimeout(function(){ $front.removeClass("highlight"); }, 1500);
    });

    // Clear: reset the queue and the deleted area
    $("#clearBtn").on("click", function(){
        queue.clear();
        $("#deleted").empty();
        showMessage("");
        renderQueue();
    });
});
