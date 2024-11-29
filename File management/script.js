class FileManager {
    constructor() {
      this.files = []; // Array to store file metadata
      this.initEventListeners();
    }
  
    // Initialize button event listeners
    initEventListeners() {
      document.getElementById('createFile').addEventListener('click', () => this.createFile());
      document.getElementById('uploadFile').addEventListener('click', () => this.uploadFile());
      document.getElementById('downloadAll').addEventListener('click', () => this.downloadAll());
      document.getElementById('deleteAll').addEventListener('click', () => this.deleteAll());
    }
  
    // Display all file names in the list
    displayFiles() {
      const fileList = document.getElementById('fileList');
      fileList.innerHTML = '';
  
      if (this.files.length === 0) {
        fileList.innerHTML = '<li>No files available</li>';
        return;
      }
  
      this.files.forEach((file, index) => {
        const li = document.createElement('li');
        li.textContent = file.name;
  
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => this.deleteFile(index));
        li.appendChild(deleteBtn);
  
        fileList.appendChild(li);
      });
    }
  
    // Create a new file
    createFile() {
      const fileName = document.getElementById('fileName').value.trim();
      const fileContent = document.getElementById('fileContent').value;
  
      if (!fileName) {
        alert('File name is required');
        return;
      }
  
      const newFile = { name: fileName, content: fileContent };
      this.files.push(newFile);
  
      alert(`File "${fileName}" created successfully!`);
      document.getElementById('fileName').value = ''; // Clear input
      document.getElementById('fileContent').value = ''; // Clear textarea
      this.displayFiles();
    }
  
    // Upload a file
    uploadFile() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
  
      if (!file) {
        alert('No file selected');
        return;
      }
  
      const reader = new FileReader();
      reader.onload = () => {
        this.files.push({ name: file.name, content: reader.result });
        alert(`File "${file.name}" uploaded successfully!`);
        fileInput.value = ''; // Clear file input
        this.displayFiles();
      };
  
      reader.onerror = () => {
        alert('Failed to read the file. Please try again.');
      };
  
      reader.readAsText(file);
    }
  
    // Download all files as individual text files
    downloadAll() {
      if (this.files.length === 0) {
        alert('No files to download');
        return;
      }
  
      this.files.forEach(file => {
        const blob = new Blob([file.content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        a.click();
        URL.revokeObjectURL(url);
      });
  
      alert('All files downloaded');
    }
  
    // Delete a specific file
    deleteFile(index) {
      const fileName = this.files[index].name;
      this.files.splice(index, 1);
      alert(`File "${fileName}" deleted successfully`);
      this.displayFiles();
    }
  
    // Delete all files
    deleteAll() {
      if (this.files.length === 0) {
        alert('No files to delete');
        return;
      }
  
      if (confirm('Are you sure you want to delete all files?')) {
        this.files = [];
        alert('All files deleted');
        this.displayFiles();
      }
    }
  }
  
  // Instantiate and expose the FileManager
  const fileManager = new FileManager();  