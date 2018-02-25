/**
 * Created by Fabio on 03/06/2017.
 */
const assert = require('assert');
const request = require('request');
const streamTitle = require('../index');
const StaticServer = require('static-server');

const PATH_TEXTURE = __dirname + '/texture';
const SERVER_HOST = 'http://localhost:1337';

const server = new StaticServer({
    rootPath: PATH_TEXTURE,
    name: 'my-http-server',
    port: 1337
});

const wrongUrl = 'http://rica.li';

describe('StreamTitle', function () {

    before(function (done) {
        server.start(function () {
            done();
        })
    });

    after(function () {
        server.stop()
    });

    it('get from shoutcast v2', function (done) {
        streamTitle({
            url: SERVER_HOST,
            sid: 1,
            type: 'shoutcast2'
        }).then(function (data) {
            console.log(data);
            done();
        }).catch(function (err) {
            console.log(err);
            done(err);
        });
    });
    it('get from shoutcast v2 wrong url', function (done) {
        streamTitle({
            url: wrongUrl,
            sid: 1,
            type: 'shoutcast2'
        }).then().catch(function (e) {
            done();
        });
    });
    it('get from shoutcast v2 without sid', function (done) {
        try {
            streamTitle({
                url: SERVER_HOST,
                type: 'shoutcast2'
            }).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required sid', e.message);
            done();
        }
    });
    it('get from shoutcast v2 without url', function (done) {
        try {
            streamTitle({
                type: 'shoutcast2'
            }).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required url', e.message);
            done();
        }
    });
    it('without type', function (done) {
        try {
            streamTitle({}).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required type', e.message);
            done();
        }
    });
    it('get from shoutcast v1', function (done) {
        streamTitle({
            url: SERVER_HOST,
            type: 'shoutcast'
        }).then(function (data) {
            console.log(data);
            done();
        }).catch(function (err) {
            console.log(err);
            done(err);
        });
    });

    it('get from shoucast v1 without url', function (done) {
        try {
            streamTitle({
                type: 'shoutcast'
            }).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required url', e.message);
            done();
        }
    });
    it('get from icecast', function (done) {
        streamTitle({
            url: SERVER_HOST,
            mount: 'lnfm.ogg',
            type: 'icecast'
        }).then(function (data) {
            console.log(data);
            done();
        }).catch(function (err) {
            console.log(err);
            done(err);
        });
    });
    it('get from icecast error without mount', function (done) {
        try {
            streamTitle({
                url: SERVER_HOST,
                type: 'icecast'
            }).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required mount', e.message);
            done();
        }
    });
    it('get from icecast error without url', function (done) {
        try {
            streamTitle({
                type: 'icecast'
            }).then();
        } catch (e) {
            console.log(e.message);
            assert.equal('required url', e.message);
            done();
        }
    });
});