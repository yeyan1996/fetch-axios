 class InterceptorManager{
    constructor() {
        this.handlerList = []
    }
    use(onsuccess,onfail) {
        this.handlerList.push(onsuccess,onfail)
    }
}