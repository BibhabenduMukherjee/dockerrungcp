const project = "pacific-diode-396304"
function requestMaker(body,auth){
    const requestt = {
        project: project,
        zone: `${body.zone}`, // Replace with the desired zone
    
        resource: {
          name: `${body.newUserId}`,
          machineType: `zones/${body.zone}/machineTypes/${body.machineType}`, // Replace with desired machineType
          networkInterfaces: [
            {
              network: `projects/${project}/global/networks/default`,
              accessConfigs: [{ kind: 'compute#accessConfig', name: 'External NAT', type: 'ONE_TO_ONE_NAT' }],
            },
          ],
          disks: [
                      {
                        "autoDelete": true,
                        "boot": true,
                        "deviceName":   `${body.newUserId}`,
                        "initializeParams": {
                          "diskSizeGb": `${body.ssd}`,
                          "diskType": `projects/${project}/zones/${body.zone}/diskTypes/pd-balanced`,
                          "labels": {},
                          "sourceImage": `${body.sourceImage}`
                        },
                        
                        "mode": "READ_WRITE",
                        "type": "PERSISTENT"
                      }
                    ],
        },
          metadata : {
          
          },
    
           tags: {
                      "items": [
                        "http-server",
                        "https-server"
                      ]
                    },
        auth: auth,
      };
    return requestt;
}

module.exports = requestMaker