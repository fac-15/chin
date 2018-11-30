
const makeRequest = (response) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const coTechObj = JSON.parse(xhr.responseText);
      // callback function
      outputServices(coTechObj);
    }
  };
  xhr.open("GET", `/coTechRequest`, true);
  xhr.send();
};

// we HAVE to call the function!!!
makeRequest();
