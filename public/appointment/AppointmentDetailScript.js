function initScript() {
    editing = false;

    var editButton = document.getElementById('editButton');
    var deleteButton = document.getElementById('deleteButton');
    var subject = document.getElementById('subject');
    var descriptionField = document.getElementById('description');
    var selectedSubject = document.getElementById(result.Subject)

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
                editButton.innerText = 'Edit';
                appointmentPut();
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
                        window.location.assign('/appointmentlist')
                    }
                }

                var endpoint = serverAddress + '/appointment/' + result.AppointmentID + '/' + result.ClientUsername
                console.log(endpoint)
                xhr.open("DELETE", endpoint, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
                xhr.send(null);
            }
        });
    });

    function appointmentPut() {

        var xhr = new XMLHttpRequest();
        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('appointmentPut done');
                console.log(xhr.responseText);

            }
        }

        var endpoint = serverAddress + '/appointment/' + result.AppointmentID

        console.log(subject.value);
        console.log(descriptionField.value);

        xhr.open("PUT", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
        xhr.send(JSON.stringify({
            'ClientUsername': result.ClientUsername,
            'Subject': subject.value,
            'Comment': descriptionField.value,
            'Status': result.Status
        }));
    }

}