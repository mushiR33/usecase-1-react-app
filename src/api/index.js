import { post, put } from '../http';

const BASE_URL =
  'https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-prod.e1-us-east-azure.choreoapis.dev';

// export async function sendPostRequest(payload) {
//   const url = `${BASE_URL}/tbeh/catalogapi/1.0.0/`;
//   const headers = {
//     'Content-Type': 'application/json',
//     'API-Key': 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzNmFmMDJhNi1kYzYxLTQ5OWItYWIyYi1iMTk1NTZmODQxNjhAY2FyYm9uLnN1cGVyIiwiaXNzIjoiaHR0cHM6XC9cL3N0cy5jaG9yZW8uZGV2OjQ0M1wvb2F1dGgyXC90b2tlbiIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJDYXRhbG9nQVBJIiwiY29udGV4dCI6IlwvYjI2MWFkOTYtYzZmNy00NmRkLWEzOGItZjZkOWM3MzIwMWViXC90YmVoXC9jYXRhbG9nYXBpXC8xLjAuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTY3NzA5NTQxNywidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNjc3MDM1NDE3LCJqdGkiOiJmOGYzM2RhMS1lMDYxLTQ3NTItYjgyNi1hOGNlYjBmZjUxM2UifQ.KnPlMKwQekwwpwvbKJpEfcse7eelzVAxY6sxYKomU6jYhge6exsf7XABnVXZe0kt0FUe2vdhd6WDDTFV032oU71IghZEvktuNmKPbK_1VRiQy45yAe1Gr_QSS4h1w_dlfjZe3RMoT5knyetYNsD7BpOgIK2THDrIib7k3vScXTMY4effbIY3hJP8YoSdiX-H4bV52V_oFaZFNhmH2IIGff6rIGFPvkiheeqEHIwOO1xex6Rh9C237kaqqRdyf7Js8FnMvWeaJZOe3-tCX6SCU_XgYgZ4xFo8qKb4juvg3f6h4qzlMKCBqj9kD0yoCkkcYv6w0yqvzO50lzGGqvS-HiXJH8CP08GguL3q9cyGRz8rn39l7HSeOto9tHSYkNGrW4wfk9PuAxA2TieBwRksHRutEeLfYEfOLkYNOUMuRuzPWHRhEwoE3bJTy-mgCms_5TpMVmWNYwqb7M6XxNratVg-MAuk_BGsVInWLXlwdtpOwy5aLR2XsDnSPb1ycUNve1elPfYdAqcCQV_-6RIbmihyY4ev3aUHa8FGI66pajTnloPEBLQqlnQNO0lffYb-MOpzpP-kn0tw9n0rv1WCIF3urE0cBD_gyidiqxiTuXBom38CU3nPy6svStjBKy_3OsgZ1BIbvGk1b_zPCcadTaNjMLl8BQDg_Wa5U2yD4jo'
//   };

//   try {
//     const response = await axios.post(url, payload, { headers });
//     console.log("#############",response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to send request');
//   }
// }


export const getCatalogs = async (accessToken) => {
    
  const requestConfig = {
      method: "POST",
      url: 'https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-prod.e1-us-east-azure.choreoapis.dev/tbeh/catalogapi/1.0.0/',
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      data:{ query: `query MyQuery { catalogs { itemDesc itemName itemImage itemID price stockDetails { color includes intendedFor material quantity } } }`, operationName: "MyQuery" }
  };

  return await post(requestConfig);
}

export const updateCatalog = async (accessToken, payload) => {
  console.log("Payload: " + JSON.stringify(payload));
  const requestConfig = {
    method: "PUT",
    url: `https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-dev.e1-us-east-azure.choreoapis.dev/tbeh/itemapi/1.0.0/items/${payload.itemID}`,
    headers: {
        "Content-Type": "application/json",
        "accept": "application/json",
        'Authorization': 'Bearer ' + accessToken
    },
    data:JSON.stringify(payload)
  };

  return await put(requestConfig);
}

export const deleteCatalog = async (accessToken, itemID) => {
    
  const requestConfig = {
      method: "POST",
      url: 'https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-prod.e1-us-east-azure.choreoapis.dev/tbeh/catalogapi/1.0.0/',
      headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          'Authorization': 'Bearer ' + accessToken
      },
      data:{ query: `query MyQuery { catalogs { itemDesc itemName itemImage itemID price stockDetails { color includes intendedFor material quantity } } }`, operationName: "MyQuery" }
  };

  return await post(requestConfig);
}



// async function sendPostRequest(payload) {
//   const url = 'https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-prod.e1-us-east-azure.choreoapis.dev/tbeh/catalogapi/1.0.0/';
//   const headers = {
//     'Content-Type': 'application/json',
//     'API-Key': 'eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiIzNmFmMDJhNi1kYzYxLTQ5OWItYWIyYi1iMTk1NTZmODQxNjhAY2FyYm9uLnN1cGVyIiwiaXNzIjoiaHR0cHM6XC9cL3N0cy5jaG9yZW8uZGV2OjQ0M1wvb2F1dGgyXC90b2tlbiIsImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJDYXRhbG9nQVBJIiwiY29udGV4dCI6IlwvYjI2MWFkOTYtYzZmNy00NmRkLWEzOGItZjZkOWM3MzIwMWViXC90YmVoXC9jYXRhbG9nYXBpXC8xLjAuMCIsInB1Ymxpc2hlciI6ImNob3Jlb19wcm9kX2FwaW1fYWRtaW4iLCJ2ZXJzaW9uIjoiMS4wLjAiLCJzdWJzY3JpcHRpb25UaWVyIjpudWxsfV0sImV4cCI6MTY3NzEwNTE2NiwidG9rZW5fdHlwZSI6IkludGVybmFsS2V5IiwiaWF0IjoxNjc3MDQ1MTY2LCJqdGkiOiI5MWI1ZjcwMC1kMjU2LTQ4ZjYtODJkZS05MGFmYTU2NmM2NDEifQ.DaP_FYAqTJRAX8WGDIah21qganYpVtuoGe7ka0X1lvEwBPTR3jCGoTnak2PoeYoq8lDameVyXbgmXIAFz94oqEaw5PyzhZJVwD2U6ySoYc88bJh2pyQHs5DprUq847NzbJzgeKkuj-_yeowXGskWTK1z9USuWjL-qJoAamFksI4FkOcwYdzny9hsalonl6NtlcXVyBAIl9iT0SRigL63NlKEOpGXUKNik5l-T3V0IShK41Y7mGdnK6Kt6fpoKk_uDVa0D_1sYRPSfc4JOO4Ab6Q93pkiHKmHJhRr1QacsmXRvULP5J9OItRBKiXlQz2Yl-5yH2FqIu6FHVnjgGX6xNpj7kaUOY2Yg_ev2fAP0S6LWgxWD-_FfRegjU7ubQPcK5aGTcC5x24_IYKk8mBjd-vBET6wg7ILfaQnfAhvK1UtSLO3pr5tUeqTSbtXlXoDYQikcph2ebkDPfGrrkqMGkTMs_ZuEIZaQlOll938vPef3DlZAbFNT2ZxWsG6rt5uPHHZOqc0E6pf19987V6fcjVeSOASyVfeW0vZKvL-_ReRt1b-zoCgoi70IZocX4g_wGYyS7ZCAqXV0p_7OoT1yvRipRQzGYzRPQoMYKeGbE0Mon799YNQ7_bNCLxHHsdjnOiiLvSuU1LBaOAehH0RiqHPe2o3dtXwYzU_eE79ODU'
//   };

//   try {
//     const response = await axios.post(url, payload, { headers });
//     console.log("#############",response.data);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to send request');
//   }
// }

export async function getCatalog(payload, httpRequest) {
  const requestConfig = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: payload,
    url: 'https://b261ad96-c6f7-46dd-a38b-f6d9c73201eb-prod.e1-us-east-azure.choreoapis.dev/tbeh/catalogapi/1.0.0'
  };

  return httpRequest(requestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function initiatePhoneVerify(email, mobile, httpRequest) {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json'
    },
    method: 'POST',
    data: {
      email: email,
      mobile: mobile
    },
    url: `${BASE_URL}/yphf/user-registration/1.0.0/initiate`
  };

  return httpRequest(requestConfig)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function verifyPhone(email, mobile, httpRequest) {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json'
    },
    method: 'POST',
    data: {
      email: email,
      mobile: mobile
    },
    url: `${BASE_URL}/yphf/user-registration/1.0.0/verify`
  };

  return httpRequest(requestConfig)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function getUsageData(userId, httpRequest) {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/scim+json'
    },
    method: 'GET',
    url: `${BASE_URL}/yphf/usage-data-api/1.0.0/getUsageData?userId=${userId}`
  };

  return httpRequest(requestConfig);
}

export const recordUserInteractions = (email, interactions, httpRequest) => {
  const { smartPhoneVisits, iotDevicesVisits, mobileSubscriptionVisits, tvSubscriptionVisits } =
    interactions;

  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: {
      email: email,
      smartPhoneVisits: smartPhoneVisits ?? 0,
      iotDevicesVisits: iotDevicesVisits ?? 0,
      mobileSubscriptionVisits: mobileSubscriptionVisits ?? 0,
      tvSubscriptionVisits: tvSubscriptionVisits ?? 0
    },
    url: `${BASE_URL}/yphf/user-interactions-api/1.0.0/interactions`
  };

  return httpRequest(requestConfig);
};

export const getPackageRecommendation = (userId, httpRequest) => {
  const requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
    params: {
      userId: userId
    },
    url: `${BASE_URL}/yphf/usage-data-api/1.0.0/packageRecommendation`
  };

  return httpRequest(requestConfig)
    .then((response) => {
      if (response?.data?.status !== 'Recommendation Found') {
        throw 'Recommendation Not Found';
      }

      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
