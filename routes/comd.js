const express = require("express");
const router = express.Router();
const authcheck = require("../middlewares/authcheck");
const { spawn } = require('child_process');

router.post("/cmd" , authcheck, async(req,res)=>{
    const { command } = req.body;
     console.log(command);
    const ssh = spawn('ssh', ['-i', '~/.ssh/bivu', 'Bibhabendu@34.131.236.138', command]);


    ssh.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        res.write(data);
      });  


      ssh.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
        res.write(data);
      });
    
      ssh.on('close', (code) => {
        if (code === 0) {
          console.log(`Command executed successfully: ${command}`);
          res.end();
        } else {
          console.error(`Error executing command: ${command}`);
          res.status(500).end();
        }
      });

      ssh.stdin.write('Y\n');
      ssh.stdin.end();
})

module.exports = router;