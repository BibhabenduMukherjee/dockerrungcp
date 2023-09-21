const { google } = require('googleapis');
const getClient = require('../../lib/computeclient');
const requestMaker = require('../../lib/requestmaker');
const compute = google.compute('v1');
const project = "pacific-diode-396304"


const publicKey = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC/3TvvQ4NKr/DjTWSfRX7f/qdaLgDU2zHZG5a9HHo15al528QLJ4HCdzvjg8Kp+Sa2K4bu6uqg6xz2bNbYbtOHwD30dhc8BYmYoxA0uwe/qYyRaww+8R1lgUa4vkwV5fgIR9F3bHMoDiH4v6vaejLY9tMx6Kt6Fjm4fDJbneX7XUsywF3FpMdVCgGcgiJjHjHOvkjw8eWiMwswIk68Y2bVUOdVv67voYPsairksyayO0BZ8eRr2uAOMs0dJv1nLljfwsqgvBXqah5gKnGTyc3hklhsQ6Nd2iQRZoDl/J3K6uRGSmr4X6yA0o31A025VDtc3q60DAUqSEWI6HTTWqJr mail2bivu04@gmail.com"
async function getCurrentFingerprint(request , auth) {
    try {
      const response = await compute.instances.get({
        project,
        zone: `${request.zone}`, // Replace with the desired zone
        instance : `${request.resource.name}`,// Replace with the instance name
        auth: auth,
      });
      
      const metadataFingerprint = response.data.metadata.fingerprint;
      console.log('Current Metadata Fingerprint:', metadataFingerprint);
      
      return metadataFingerprint;
    } catch (err) {
      console.error('Error fetching current fingerprint:', err.message);
      return "Error fetching current fingerprint:";
    }
  }



async function createVM(requestt,auth) {
  try {
      const response = await compute.instances.insert(requestt);
      console.log('----VM instance creation operation initiated: -------' );
  
    // Use the 'name' field from the response to check operation status
      const operationName = response.data.name;
  
    // Poll for operation status
    const pollInterval = 1000; // Interval in milliseconds
    while (true) {
      const operationResponse = await compute.zoneOperations.get({
        project: project,
        zone: `${requestt.zone}`, // Replace with the desired zone
        operation: operationName,
        auth: auth,
      });
  
      console.log('Operation status: ------ ', operationResponse.data.status);
  
      if (operationResponse.data.status === 'DONE') {
        try{
          const vmInfo =  await compute.instances.get({
            project: project,
            zone: `${requestt.zone}`, // Replace with the desired zone
            instance : `${requestt.resource.name}`,
            auth: auth,
          });
          console.log('VM instance creation completed: 🚀',);
          // for getting the ip vmInfo.data.networkInterfaces[0].accessConfig[0].natIp
         // console.log("info about vm" , vmInfo.data);
          return vmInfo.data; // Exit the loop when operation is done
        }catch(error){console.log(
            "error"
        )
            return "VM crearetion error"
    }
        
      }
     
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }
    } catch (err) {
      console.error('Error creating VM instance:', err.message);
    }
  }


  async function addSshKey(fingerprint , request , auth , body) {
  
    // console.log(metadata)
    // create a new ssh-key
     try {
       const response = await compute.instances.setMetadata({
             project,
             zone: `${request.zone}`, // Replace with the desired zone
             instance : `${request.resource.name}`,
             auth: auth,
           requestBody: {
             kind : "compute#metadata",
             fingerprint : fingerprint,
             items: [{ key: 'ssh-keys', value: `${body.userFirstname}:` + publicKey  }],
         },
       });
   
       console.log('SSH key added:', response.data);
     } catch (err) {
        
       console.error('Error adding SSH key:', err);
       //return "Error adding SSH key: " ;
     }
   }



/*
@param 
 -- name : string
 -- description : string
 -- machineType : string
 -- zone : string
 -- sourceType : string
 -- ssd : string
*/
async function createvmins(body){
 // get the client for api
  
    const auth = await getClient();
    //console.log("the auth -------- " , auth);
    // form the request object
    const request = requestMaker(body,auth)
    //console.log("request----- " , request);
    
    // start creation of vm
    const vmInfo = await createVM(request,auth)
     // find the fingerprint
    const fingerprint = await getCurrentFingerprint(request , auth );
     // add the ssh-key to the vm as a metadata
    await addSshKey(fingerprint , request , auth , body );
    return vmInfo
    //return  request;

}

module.exports = createvmins