'use strict'

const App = {
    data() {
        return {
            allMessages: [],
            counter: 0,
            inputValue: '',
            isActive: true
        }
    },
    mounted() {
        this.getMessages();
    },
    methods: {
        checkPosition() {
            let messages = this.$refs.messages;
            let temp = messages.scrollTop;
            messages.scrollTop = 1 + messages.scrollHeight - messages.clientHeight;
            let height = messages.scrollTop;
            messages.scrollTop = temp;
            let scroll = messages.scrollTop;
            if (height - scroll === 0) {
                this.getMessages();
            }
        },
        getMessages() {
            axios.get(`https://numia.ru/api/getMessages?offset=${this.counter}`).then(response => {
                response.data.result.forEach(element => this.allMessages.push({ message: element, tag: false }));
                this.counter += response.data.result.length;
                this.$refs.loading.hidden = true;
            }).catch(error => {
                this.$refs.loading.hidden = false;
                alert('Ошибка, пробуем снова');
                setTimeout(this.getMessages, 3000);
            })
        },
        inputChangeHandler(event) {
            this.inputValue = event.target.value;
        },
        sendMyMessage() {
            let messages = this.$refs.messages;
            if (this.inputValue) {
                this.allMessages.push({ message: this.inputValue, tag: true });
                this.inputValue = '';

                setTimeout(() => {
                    messages.scrollTop = messages.scrollHeight;
                }, 300)
            }
        }
    }
}

Vue.createApp(App).mount('#app');