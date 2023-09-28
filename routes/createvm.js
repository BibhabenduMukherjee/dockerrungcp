const express = require("express");
const authcheck = require("../middlewares/authcheck");
const createvmins = require("../src/compute/createvmins");
const userIdFormater = require("../lib/userIdFormater");
const router = express.Router();
const s = {
    id: '2278174613997562224',
    creationTimestamp: '2023-09-23T00:45:05.739-07:00',
    name: 'tppdxziuredjf-95455103012',
    fingerprint: '42WmSpB8rSM=',
    status: 'RUNNING',
    networkInterfacesName: 'nic0',
    networkInterfacesNameAccessConfigsList: [
      {
        kind: 'compute#accessConfig',
        type: 'ONE_TO_ONE_NAT',
        name: 'External NAT',
        natIP: '34.131.70.63',
        networkTier: 'PREMIUM'
      }
    ],
    disks: [
      {
        kind: 'compute#attachedDisk',
        type: 'PERSISTENT',
        mode: 'READ_WRITE',
        source: 'https://www.googleapis.com/compute/v1/projects/pacific-diode-396304/zones/asia-south2-b/disks/tppdxziuredjf-95455103012',
        deviceName: 'tppdxziuredjf-95455103012',
        index: 0,
        boot: true,
        autoDelete: true,
       
        interface: 'SCSI',
       
        diskSizeGb: '40',
        architecture: 'X86_64'
      }
    ],
    cpuPlatform: 'Intel Cascade Lake',
    deletionProtection: false
  }
router.post("/createvm" ,authcheck ,async (req, res) => {
    const originalUserId = req.body.userid
    let newUserId = userIdFormater(originalUserId);
    //console.log(newUserId);
    console.log(req.body);
    const data = {...req.body , newUserId}
    console.log(data);
   const vmInfo = await createvmins(data)
    const responseObj = {
        id : vmInfo?.id,
        creationTimestamp : vmInfo?.creationTimestamp,
        name : vmInfo?.name,
        fingerprint : vmInfo.tags?.fingerprint,
        status : vmInfo?.status,
        networkInterfacesName : vmInfo?.networkInterfaces[0]?.name,
        networkInterfacesNameAccessConfigsList : vmInfo?.networkInterfaces[0]?.accessConfigs,
        disks : vmInfo?.disks,
        cpuPlatform : vmInfo?.cpuPlatform,
        deletionProtection: vmInfo?.deletionProtection

    }


    console.log( "response data from server ");
    res.send(responseObj)
})

module.exports = router;