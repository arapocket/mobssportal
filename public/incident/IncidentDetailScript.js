function initScript() {
    editing = false;

    console.log('userType: ' + userType);

    var editButton = document.getElementById('editButton');
    var deleteButton = document.getElementById('deleteButton');
    var subject = document.getElementById('subject');
    var descriptionField = document.getElementById('description');
    var selectedSubject = document.getElementById(result.Subject)
    var status = document.getElementById('status');
    var statusNote = document.getElementById('statusNote');

    try {
        selectedSubject.setAttribute('selected', '');
    } catch (e) {
        console.log(e);
    }

    editButton.addEventListener('click', function () {

        if (!editing) {

            try {
                descriptionField.removeAttribute('disabled')
                subject.removeAttribute('disabled');

                if (userType == 2) {
                    status.removeAttribute('disabled');
                    statusNote.removeAttribute('disabled');
                }


                editButton.innerText = 'Done';
                editing = true;
            } catch (e) {
                console.log(e);
            }


        } else {

            try {
                editing = false;
                descriptionField.disabled = '';
                descriptionField.setAttribute('disabled', '')
                subject.setAttribute('disabled', '');
                status.setAttribute('disabled', '');
                statusNote.setAttribute('disabled', '');
                editButton.innerText = 'Edit';
                incidentPut();
            } catch (e) {
                console.log(e);
            }
        }
    })

    deleteButton.addEventListener('click', function () {

        bootbox.hideAll();
        bootbox.confirm("Are you sure?", function (res) {

            if (res) {
                var xhr = new XMLHttpRequest();
                if (!xhr) {
                    console.log('Giving up :( Cannot create an XMLHTTP instance');
                    return false;
                }

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == XMLHttpRequest.DONE) {
                        console.log(xhr.responseText);
                        window.location.assign('/incidentlist')
                    }
                }

                var endpoint = serverAddress + '/incident/' + result.IncidentID
                console.log(endpoint)
                xhr.open("DELETE", endpoint, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
                xhr.send(null);
            }
        });
    });

    function incidentPut() {

        var xhr = new XMLHttpRequest();
        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('incidentPut done');
                console.log(xhr.responseText);

            }
        }

        var endpoint = serverAddress + '/incident/' + result.IncidentID

        console.log(subject.value);
        console.log(descriptionField.value);

        xhr.open("PUT", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
        xhr.send(JSON.stringify({
            'ClientUsername': result.ClientUsername,
            'CompanyName': result.CompanyName,
            'Subject': subject.value,
            'Description': descriptionField.value,
            'Status': status.value,
            'StatusNote': statusNote.value
        }));
    }

}