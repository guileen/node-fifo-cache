var LRUCache = require('lru-cache')

suite('LRUCache', function() {
    var cache = new LRUCache({
        max: 500000,
        maxAge: 5000
    })
    var objs = []
    for (var j=0; j<100; j++) {
        var obj = {}
        for (var i=0; i<100; i++) {
            obj['k'+i] = 'v'+i
        }
        objs.push(obj)
    }
    set('mintime', 3000)
    bench('set', function() {
        cache.set('k'+Math.floor(Math.random() * 100000), objs[Math.floor(Math.random() * obj.length)])
    })

    bench('get', function() {
        cache.get('k'+Math.floor(Math.random() * 100000))
    })

    bench('del', function() {
        cache.get('k'+Math.floor(Math.random() * 100000))
    })
})
