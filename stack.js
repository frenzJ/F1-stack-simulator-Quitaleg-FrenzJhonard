
class Stack {
    constructor() {
        this.items = []
        this.count = 0
         
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element
        let push_res=`${element}`; //console.log(`added to ${this.count}`);
        this.count += 1;
        let count=this.count -1;
        //return [push_res,count];
        return [push_res, count];
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if(this.count == 0) return undefined
        let deleteItem = this.items[this.count - 1]
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
    }

    // Check top element in stack
    peek() {
        console.log(`Top element is ${this.items[this.count - 1]}`)
        return this.items[this.count - 1]
    }

    // Check if stack is empty
    isEmpty() {
        console.log(this.count == 0 ? 'Stack is empty' : 'Stack is NOT empty')
        return this.count == 0
    }

    // Check size of stack
    size() {
        console.log(`${this.count} elements in stack`)
        return this.count
    }

    // Print elements in stack
    print() {
        let str = ''
        for(let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear stack
    clear() {
        this.items = []
        this.count = 0
        console.log('Stack cleared..')
        return this.items
    }
}

const stack = new Stack()

// Show a message under the simulator
function showMessage(text) {
    $("#message").text(text);
}

// Redraw the stack blocks. The newest item is prepended, so it shows on top.
function renderStack() {
    $("#stack").empty();
    for (let i = 0; i < stack.count; i++) {
        const color = (i % 2 == 0) ? "bg-primary" : "bg-success";
        $("#stack").prepend($("<div>").addClass(`row ${color} push`).text(stack.items[i]));
    }
}

$(document).ready(function(){
    // Push: add the typed value to the top
    $("#pushBtn").on("click", function(){
        const value = $("#dataInput").val().trim();
        if (value === "") {
            showMessage("Please type a value first.");
            return;
        }
        stack.push(value);
        $("#dataInput").val("").focus();
        showMessage("");
        renderStack();
    });

    // Pop: remove the top and show it in the deleted area
    $("#popBtn").on("click", function(){
        if (stack.count == 0) {
            showMessage("The stack is empty. Nothing to pop.");
            return;
        }
        const removed = stack.pop();
        $("#deleted").append($("<div>").addClass("row pop text-bg-danger border border-light").text(removed));
        showMessage("");
        renderStack();
    });

    // Peek: highlight the top without removing it
    $("#peekBtn").on("click", function(){
        if (stack.count == 0) {
            showMessage("The stack is empty. Nothing to peek.");
            return;
        }
        showMessage("");
        const $top = $("#stack .push").first();
        $top.addClass("highlight");
        setTimeout(function(){ $top.removeClass("highlight"); }, 1500);
    });

    // Clear: reset the stack and the deleted area
    $("#clearBtn").on("click", function(){
        stack.clear();
        $("#deleted").empty();
        showMessage("");
        renderStack();
    });
});
