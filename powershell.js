const shell = require('node-powershell');



module.exports = function(RED) {
    function PowershellNode(config) {
        RED.nodes.createNode(this, config);
        let ps = new shell({
            executionPolicy: 'Bypass',
            noProfile: true
        });

        this.on('input', function(msg) {
            ps.addCommand(msg.payload);
            ps.invoke()
            .then(output => {
                this.send([output, null]);
            })
            .catch(error => {
                this.error(error);
            });
        });

        this.on('close', function() {

            ps.dispose();
        })
    }



    RED.nodes.registerType("powershell", PowershellNode);
}