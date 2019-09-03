const os = require('os');

module.exports = {
    entry: '@/main',
    outputRoot: '../dist',
    api: 'api/',
    dev: {
        'host': get_ip(),
        'port': '2333',
        'proxy': 'https://localhost:8081'
    }
}

function get_ip() {
    let needHost = ''; // 打开的host
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}