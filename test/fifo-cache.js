var FifoCache = require('../lib/fifo-cache')
var expect = require('chai').expect

describe('FifoCache', function() {
    var cache = new FifoCache({
        max: 3,
        maxAge: 1000
    })

    it('should set/get cache', function() {
        var obj = {'hello': 'world'}
        cache.set('foo', obj)
        var result = cache.get('foo')
        expect(result).to.be.ok
        expect(result.hello).to.be.eql('world')
    })

    it('should del cache', function() {
        cache.del('foo')
        var result = cache.get('foo')
        expect(result).to.be.undefined
    })

    it('should not store more than max items', function() {
        cache.set('k1', 'v1')
        cache.set('k2', 'v2')
        cache.set('k3', 'v3')
        expect(cache.get('foo')).to.be.undefined
        expect(cache.get('k1')).to.be.ok
        cache.set('k4', 'v4')
        expect(cache.get('k1')).to.be.undefined
    })

    it('should not keep items longer than maxAge', function(done) {
        cache.set('t1', 'v1', 50)
        cache.set('t2', 'v2', 100)
        cache.set('t3', 'v3', 150)
        cache.set('t4', 'v4', 200)
        setTimeout(function() {
            expect(cache.get('t1')).to.be.undefined
            expect(cache.get('t2')).to.be.undefined
            expect(cache.get('t3')).to.be.eql('v3')
            expect(cache.get('t4')).to.be.eql('v4')
            done()
        }, 125)
    })
})
