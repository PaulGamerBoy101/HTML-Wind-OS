document.addEventListener('DOMContentLoaded', () => {
    // Start loading animation
    const loadingBar = document.querySelector('.loading-bar');
    setTimeout(() => {
        loadingBar.style.width = "100%";
    }, 100); // Start shortly after DOM load to ensure the transition is visible

    // Hide boot screen after 10 seconds
    setTimeout(() => {
        document.getElementById('bootScreen').style.display = 'none';
    }, 10000); // Match the duration of the loading bar animation
});



function toggleStartMenu() {
    const menu = document.getElementById("startMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
    showSearchBarIfNeeded();
}

function openWindow(id) {
    document.querySelectorAll('.window').forEach(win => win.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    showSearchBarIfNeeded();
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
    showSearchBarIfNeeded();
}

function openWindow2(id) {
    document.querySelectorAll('.window2').forEach(win => win.style.display = 'none');
    document.getElementById(id).style.display = 'block';
    showSearchBarIfNeeded();
}
    

function minimizeWindow(id) {
    closeWindow(id);
}

function exitOS() {
    window.close();
}

function searchGoogle(event) {
    if (event.key === "Enter") {
        const query = event.target.value;
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank').focus();
    }
}

document.getElementById('darkModeToggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);

    // Define your dark and light background images or colors
    const lightModeBackground = "url('https://www.icolorpalette.com/download/solidcolorimage/9f9f9f_solid_color_background_icolorpalette.png')"; // Example light mode background
    const darkModeBackground = "url('https://imageio.forbes.com/specials-images/imageserve/5ed68e8310716f0007411996/A-black-screen--like-the-one-that-overtook-the-internet-on-the-morning-of-June-2-/960x0.jpg?format=jpg&width=960')"; // Update this URL or use a color for dark mode background

    // Check if dark mode is enabled and update the background accordingly
    if (this.checked) {
        document.getElementById('desktop').style.backgroundImage = darkModeBackground;
    } else {
        document.getElementById('desktop').style.backgroundImage = lightModeBackground;
    }
});

function showSearchBarIfNeeded() {
    const searchBar = document.querySelector('.search-box');
    const isOpen = Array.from(document.querySelectorAll('.window, .window2')).some(win => win.style.display === 'block');
    searchBar.style.display = isOpen || document.getElementById("startMenu").style.display === "block" ? 'none' : 'block';
}

// Implement functions for saveFile, downloadText, updateFileManager, and openFile
// Placeholder for functions to manage files

document.addEventListener('DOMContentLoaded', () => {
    showSearchBarIfNeeded(); // Ensure correct initial state
});

let currentCalculation = '';

function calculatorInput(value) {
    currentCalculation += value;
    document.getElementById('calculatorScreen').innerText = currentCalculation;
}

function clearCalculator() {
    currentCalculation = '';
    document.getElementById('calculatorScreen').innerText = '';
}

function calculateResult() {
    try {
        const result = eval(currentCalculation);
        document.getElementById('calculatorScreen').innerText = result;
        currentCalculation = result.toString();
    } catch (error) {
        document.getElementById('calculatorScreen').innerText = 'Error';
        currentCalculation = '';
    }
}

// Modify the updateClock function
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const isPm = hours >= 12;
    const formattedHours = ((hours + 11) % 12 + 1);
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const timeString = `${formattedHours}:${formattedMinutes} ${isPm ? 'PM' : 'AM'}`;
    const dateString = now.toLocaleDateString();

    // Update taskbar clock
    document.getElementById('clock').innerHTML = `
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
    `;

    // Update popup clock
    document.getElementById('clockDisplay').innerText = `${timeString} on ${dateString}`;
    
    // Optionally, update the calendar display too
    updateCalendarDisplay(now);
}

// Add event listener to the taskbar clock
document.getElementById('clock').addEventListener('click', function() {
    const popup = document.getElementById('clockCalendarPopup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

// Function to generate and update calendar display
function updateCalendarDisplay(date) {
    const calendarDisplay = document.getElementById('calendarDisplay');
    calendarDisplay.innerHTML = ''; // Clear the previous content

    // Create and add month and year header
    const header = document.createElement('div');
    header.textContent = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
    header.style.textAlign = 'center';
    header.style.marginBottom = '10px';
    calendarDisplay.appendChild(header);

    // Days of the week header
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysHeader = document.createElement('div');
    daysHeader.style.display = 'flex';
    daysHeader.style.justifyContent = 'space-around';
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        daysHeader.appendChild(dayElement);
    });
    calendarDisplay.appendChild(daysHeader);

    // Get the first day of the month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // Get the last day of the month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // Current day for comparison
    const today = new Date();

    // Create the calendar grid
    const datesGrid = document.createElement('div');
    datesGrid.style.display = 'grid';
    datesGrid.style.gridTemplateColumns = 'repeat(7, 1fr)';
    datesGrid.style.gap = '2px';

    // Fill in blanks for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const blank = document.createElement('div');
        datesGrid.appendChild(blank);
    }

    // Fill in the days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        dayElement.className = 'calendar-grid-day'; // Add the calendar-grid-day class
        dayElement.style.textAlign = 'center';

        // Check if this is today's date
        if (today.getDate() === day && today.getMonth() === date.getMonth() && today.getFullYear() === date.getFullYear()) {
            dayElement.classList.add('today'); // Add the .today class if it's the current day
        }

        datesGrid.appendChild(dayElement);
    }

    calendarDisplay.appendChild(datesGrid);
}



// Call updateClock immediately to ensure the popup is populated
updateClock();
// Continue to update every second
setInterval(updateClock, 1000);


document.getElementById('urlInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        loadSite(this.value);
    }
});

function loadSite(url) {
    // Simple validation and modification to ensure the URL is in the correct format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }
    document.getElementById('webDisplay').src = url;
}

function updateFileManagerDisplay() {
    const fileListElement = document.getElementById('fileList');
    const fileIconsContainer = document.getElementById('fileIconsContainer'); // Get the container for file icons
    fileListElement.innerHTML = ''; // Clear current list
    fileIconsContainer.innerHTML = ''; // Clear current icons

    const files = JSON.parse(localStorage.getItem('files') || '{}');

    Object.keys(files).forEach(fileName => {
        const file = files[fileName];
        const fileIconHTML = getFileIcon(fileName); // Get file icon based on the extension

        // Create an element for the file item
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        // Create an element for the file icon
        const fileIcon = document.createElement('div');
        fileIcon.className = 'file-icon';
        fileIcon.innerHTML = fileIconHTML; // Include the file icon
        fileIcon.onclick = () => openFile(fileName, file.content); // Open file on icon click
        
        // Append the file icon to the sidebar container
        fileIconsContainer.appendChild(fileIcon);
        
        // Create detailed information including name and meta for the main content area
        const fileInfo = document.createElement('div');
        fileInfo.innerHTML = `${fileName} - Size: ${file.size}, Last Modified: ${file.lastModified}`;
        fileItem.appendChild(fileInfo);
        
        fileItem.onclick = () => openFile(fileName, file.content);
        fileListElement.appendChild(fileItem);
    });
}



function openFile(fileName, fileContent) {
    // Check the file type from the fileName
    if (fileName.endsWith('.txt')) {
        // Open the text editor and load the content
        document.getElementById('editorContent').value = fileContent;
        openWindow('textEditor');
    } else if (fileName.match(/\.(jpg|jpeg|png|webp)$/i)) {
        // Open the image viewer and load the image
        document.getElementById('imageView').src = fileContent;
        openWindow('imageViewer');
    } else if (fileName.endsWith('.pdf')) {
        // Open the PDF viewer and load the PDF
        document.getElementById('pdfView').src = fileContent;
        openWindow('pdfViewer');
    } else {
        alert('Unsupported file type. Implement additional handlers as needed.');
    }
}


// Make sure to call updateFileManagerDisplay to refresh the file list when you load the page or after adding new files
updateFileManagerDisplay();


// Ensure this function is called to populate the file manager on page load or when the file manager is opened
updateFileManagerDisplay();

document.getElementById('saveButton').addEventListener('click', function() {
    const textContent = document.getElementById('editorContent').value;
    const fileName = prompt('Enter file name:');
    if (fileName) {
        const files = JSON.parse(localStorage.getItem('files') || '{}');
        files[fileName] = textContent;
        localStorage.setItem('files', JSON.stringify(files));
        updateFileManagerDisplay();
        alert('File saved.');
    } else {
        alert('File not saved. Please provide a file name.');
    }
});

// Call this function on page load or when the file manager window is opened to display existing files
updateFileManagerDisplay();

function downloadText() {
    const textContent = document.getElementById('editorContent').value;
    const fileName = prompt('Enter file name for download:'); // Ask user for file name
    if (!fileName) {
        alert('Download cancelled. No file name provided.');
        return; // Exit if no file name is provided
    }
    // Create a Blob with the text content
    const textBlob = new Blob([textContent], { type: 'text/plain' });
    // Create a link and set it to the Blob URL
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(textBlob);
    downloadLink.download = fileName; // Set the file name for the download
    // Trigger the download by programmatically clicking the link
    document.body.appendChild(downloadLink); // Add the link to the document
    downloadLink.click(); // Trigger the download
    document.body.removeChild(downloadLink); // Clean up
}

function changeWallpaper() {
    const wallpaperUrl = document.getElementById('wallpaperUrl').value;
    if (wallpaperUrl) {
        // Applying the wallpaper to the #desktop element
        document.getElementById('desktop').style.backgroundImage = `url('${wallpaperUrl}')`;
        document.getElementById('desktop').style.backgroundSize = 'cover'; // Ensure the wallpaper covers the whole area
        document.getElementById('desktop').style.backgroundPosition = 'center'; // Center the wallpaper

        // Add a text shadow to the logo for better visibility
        document.getElementById('logo').style.textShadow = '0 0 8px #FFF, 0 0 8px #FFF, 0 0 8px #FFF, 0 0 8px #FFF';
        // Alternatively, you can use a white background highlight
        // document.getElementById('logo').style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        // document.getElementById('logo').style.padding = '5px';
        // document.getElementById('logo').style.borderRadius = '5px';
    } else {
        alert('Please enter a wallpaper URL.');
    }
}

function minimizeWindow(windowId, windowLabel) {
    const windowElement = document.getElementById(windowId);
    windowElement.style.display = 'none'; // Hide the window

    // Check if a button for this window already exists
    const minimizedButtonId = `min-btn-${windowId}`;
    let minimizedButton = document.getElementById(minimizedButtonId);

    if (!minimizedButton) {
        // Create a new button if it doesn't exist
        minimizedButton = document.createElement('button');
        minimizedButton.id = minimizedButtonId;
        minimizedButton.textContent = windowId; // Use the window's ID as placeholder text
        minimizedButton.classList.add('taskbar-button'); // Add styling class if needed

        minimizedButton.onclick = function() {
            // Restore the window and remove the button on click
            windowElement.style.display = 'block';
            minimizedButton.parentNode.removeChild(minimizedButton);
        };

        // Add the new button to the taskbar or a specific container for minimized windows
        const taskbarContainer = document.getElementById('minimizedWindowsContainer');
        taskbarContainer.appendChild(minimizedButton);
    }
}



function createAnalogClock() {
    const analogClock = document.getElementById('analogClock');
    analogClock.innerHTML = ''; // Clear the clock container

    // Create clock hands
    const hourHand = document.createElement('div');
    hourHand.className = 'clock-hand hour-hand';

    const minuteHand = document.createElement('div');
    minuteHand.className = 'clock-hand minute-hand';

    const secondHand = document.createElement('div');
    secondHand.className = 'clock-hand second-hand';

    // Append clock hands
    analogClock.appendChild(hourHand);
    analogClock.appendChild(minuteHand);
    analogClock.appendChild(secondHand);

    updateAnalogClock(hourHand, minuteHand, secondHand);
    setInterval(() => updateAnalogClock(hourHand, minuteHand, secondHand), 1000);
}

function updateAnalogClock(hourHand, minuteHand, secondHand) {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + ((seconds / 60) * 6) + 90;
    const hourDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

// Call this function when initializing your UI
createAnalogClock();

function handleFiles(files) {
    Array.from(files).forEach(file => {
        // Prepare file metadata
        const fileSize = (file.size / 1024).toFixed(2) + ' KB'; // Convert bytes to kilobytes
        const fileModifiedDate = new Date(file.lastModified).toLocaleDateString();

        // Use FileReader to read the file content
        const reader = new FileReader();
        reader.onload = function(e) {
            // File content is ready to be used
            const fileContent = e.target.result;
            
            // Creating an object to store file data along with metadata
            const fileData = {
                content: fileContent,
                size: fileSize,
                lastModified: fileModifiedDate
            };
            
            // Storing file data in localStorage (consider limitations)
            saveFileToLocalStorage(file.name, fileData);
            
            // Update the file manager display
            updateFileManagerDisplay();
        };
        
        if (file.type.match('image.*') || file.type === 'application/pdf') {
            reader.readAsDataURL(file); // For images and PDFs, read as Data URL
        } else {
            reader.readAsText(file); // For text files, read as text
        }
    });
}


function saveFileToLocalStorage(fileName, fileData) {
    const files = JSON.parse(localStorage.getItem('files') || '{}');
    files[fileName] = fileData;
    localStorage.setItem('files', JSON.stringify(files));
}

// Update your existing functions to include the image viewer in any app switching logic if necessary


function updateBatteryStatus() {
    navigator.getBattery().then(function(battery) {
        function update() {
            const batteryLevel = Math.round(battery.level * 100) + '%';
            document.getElementById('batteryStatus').textContent = batteryLevel;
        }
        // Update immediately
        update();
        // Update on battery status change
        battery.addEventListener('chargingchange', update);
        battery.addEventListener('levelchange', update);
    }).catch(function(err) {
        console.warn('Battery Status API not supported:', err);
        document.getElementById('batteryStatus').textContent = 'N/A';
    });
}

// Call this function when your application starts
updateBatteryStatus();

function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch(extension) {
        case 'txt':
            return '📄'; // Text file icon
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
            return '🖼️'; // Image file icon
        case 'pdf':
            return '📕'; // PDF file icon
        case 'doc':
        case 'docx':
            return '📝'; // Word document icon
        case 'xls':
        case 'xlsx':
            return '📊'; // Excel file icon
        case 'ppt':
        case 'pptx':
            return '📈'; // PowerPoint icon
        case 'zip':
        case 'rar':
        case '7z':
            return '🗜️'; // Compressed file icon
        case 'mp3':
        case 'wav':
            return '🎵'; // Audio file icon
        case 'mp4':
        case 'avi':
        case 'mkv':
            return '🎥'; // Video file icon
        case 'html':
        case 'htm':
            return '🌐'; // HTML file icon
        // Add more file types as needed
        default:
            return '📦'; // Default file icon
    }
}


function importWallpaper() {
    const fileInput = document.getElementById('wallpaperFile');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            // Set the desktop background to the selected image
            document.getElementById('desktop').style.backgroundImage = `url('${e.target.result}')`;
            // Optional: Save the wallpaper setting locally
            localStorage.setItem('currentWallpaper', e.target.result);
        };

        reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
        alert('Please select an image file.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const savedWallpaper = localStorage.getItem('currentWallpaper');
    if (savedWallpaper) {
        document.getElementById('desktop').style.backgroundImage = `url('${savedWallpaper}')`;
    }
});
