const shell = require('node-powershell');



module.exports = function(RED) {
    function PowershellNode(config) {
        RED.nodes.createNode(this, config);
        
        this.on('input', function(msg) {
            let ps = new shell({
				executionPolicy: 'Bypass',
				noProfile: true,
				pwsh: true
			});
			
			ps.addCommand(msg.payload);
			
            ps.invoke()
				.then(output => {
					msg.payload = output;
					this.send(msg);
					ps.dispose();
				})
				.catch(error => {
					msg.payload = error;
					this.error(error, msg);
					ps.dispose();
				});
				
        });
    }

    RED.nodes.registerType("powershell", PowershellNode);
}
