function initScript() {
    editing = false;

    console.log('userType: ' + userType);

    var editButton = document.getElementById('editButton');
    var deleteButton = document.getElementById('deleteButton');
    var subject = document.getElementById('subject');
    var commentField = document.getElementById('description');
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
                commentField.removeAttribute('disabled')
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
                commentField.disabled = '';
                commentField.setAttribute('disabled', '')
                subject.setAttribute('disabled', '');
                status.setAttribute('disabled', '');
                statusNote.setAttribute('disabled', '');
                editButton.innerText = 'Edit';
                suggestionPut();
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
                        window.location.assign('/suggestionlist')
                    }
                }

                var endpoint = serverAddress + '/suggestion/' + result.SuggestionID
                console.log(endpoint)
                xhr.open("DELETE", endpoint, true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
                xhr.send(null);
            }
        });
    });

    function suggestionPut() {

        var xhr = new XMLHttpRequest();
        if (!xhr) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log('suggestionPut done');
                console.log(xhr.responseText);

            }
        }

        var endpoint = serverAddress + '/suggestion/' + result.SuggestionID

        console.log(subject.value);
        console.log(commentField.value);

        xhr.open("PUT", endpoint, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', serverAddress);
        xhr.send(JSON.stringify({
            'ClientUsername': result.ClientUsername,
            'CompanyName': result.CompanyName,
            'Subject': subject.value,
            'Description': commentField.value,
            'Status': status.value,
            'StatusNote': statusNote.value
        }));
    }

}