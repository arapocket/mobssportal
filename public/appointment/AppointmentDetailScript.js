function initScript() {
    editing = false;

    console.log('userType: ' + userType);

    var editButton = document.getElementById('editButton');
    var deleteButton = document.getElementById('deleteButton');
    var subject = document.getElementById('subject');
    var commentField = document.getElementById('comment');
    var selectedSubject = document.getElementById(result.Subject)
    var status = document.getElementById('status');
    var statusNote = document.getElementById('statusNote');
    var date = document.getElementById('datepicker');
    var time = document.getElementById('timepicker');


    console.log('logging date and time:');
    console.log(date.value);
    console.log(time.value);


    try {
        selectedSubject.setAttribute('selected', '');
    } catch (e) {
        console.log(e);
    }

    editButton.addEventListener('click', function () {

        if (!editing) {

            try {
                commentField.removeAttribute('disabled')
                subject.removeAttribute('disabled');
                date.removeAttribute('disabled');
                time.removeAttribute('disabled');
                

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
                commentField.disabled = '';
                commentField.setAttribute('disabled', '')
                subject.setAttribute('disabled', '');
                date.setAttribute('disabled', '');
                time.setAttribute('disabled', '');
                status.setAttribute('disabled', '');
                statusNote.setAttribute('disabled', '');
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

                var endpoint = serverAddress + '/appointment/' + result.AppointmentID
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
        console.log(commentField.value);

        xhr.open("PUT", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
        xhr.send(JSON.stringify({
            'ClientUsername': result.ClientUsername,
            'CompanyName': result.CompanyName,
            'Subject': subject.value,
            'Comment': commentField.value,
            'Status': status.value,
            'StatusNote': statusNote.value,
            'Date': date.value,
            'Time': time.value
        }));
    }

}