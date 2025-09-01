// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('.admin-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            // Update active nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // File Upload Functionality
    const fileInput = document.getElementById('file-input');
    const uploadZone = document.getElementById('upload-zone');
    const filePreview = document.getElementById('file-preview');
    const browseLink = document.querySelector('.browse-link');
    
    let selectedFiles = [];

    // Browse files click
    browseLink.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('click', () => fileInput.click());

    // Drag and drop
    uploadZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    });

    // File input change
    fileInput.addEventListener('change', function() {
        const files = Array.from(this.files);
        handleFiles(files);
    });

    function handleFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
                selectedFiles.push(file);
                createPreview(file);
            }
        });
    }

    function createPreview(file) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        
        const reader = new FileReader();
        reader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                previewItem.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="preview-remove" onclick="removePreview(this, '${file.name}')">&times;</button>
                `;
            } else if (file.type.startsWith('video/')) {
                previewItem.innerHTML = `
                    <video src="${e.target.result}" controls></video>
                    <button class="preview-remove" onclick="removePreview(this, '${file.name}')">&times;</button>
                `;
            }
        };
        reader.readAsDataURL(file);
        
        filePreview.appendChild(previewItem);
    }

    // Global function for removing previews
    window.removePreview = function(button, fileName) {
        selectedFiles = selectedFiles.filter(file => file.name !== fileName);
        button.parentElement.remove();
    };

    // Form submission
    const uploadForm = document.getElementById('media-upload-form');
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData();
        const category = document.getElementById('category').value;
        const mediaType = document.getElementById('media-type').value;
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        
        if (selectedFiles.length === 0) {
            showNotification('Please select at least one file to upload.', 'error');
            return;
        }

        // Add form data
        formData.append('category', category);
        formData.append('mediaType', mediaType);
        formData.append('title', title);
        formData.append('description', description);
        
        // Add files
        selectedFiles.forEach((file, index) => {
            formData.append(`file_${index}`, file);
        });

        // Simulate upload (replace with actual upload logic)
        simulateUpload(formData);
    });

    function simulateUpload(formData) {
        const submitBtn = uploadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        submitBtn.disabled = true;

        // Simulate upload delay
        setTimeout(() => {
            // Add to gallery
            selectedFiles.forEach(file => {
                addToGallery(file, formData);
            });
            
            showNotification('Media uploaded successfully!', 'success');
            clearForm();
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    function addToGallery(file, formData) {
        const mediaGrid = document.getElementById('media-grid');
        const category = formData.get('category');
        const title = formData.get('title');
        const mediaType = formData.get('mediaType');
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const mediaItem = document.createElement('div');
            mediaItem.className = 'media-item';
            mediaItem.setAttribute('data-category', category);
            mediaItem.setAttribute('data-type', mediaType);
            
            const isVideo = file.type.startsWith('video/');
            const videoIndicator = isVideo ? '<div class="video-indicator"><i class="fas fa-play"></i></div>' : '';
            const videoClass = isVideo ? 'video-thumbnail' : '';
            
            mediaItem.innerHTML = `
                <div class="media-thumbnail ${videoClass}">
                    ${isVideo ? 
                        `<video><source src="${e.target.result}" type="${file.type}"></video>` :
                        `<img src="${e.target.result}" alt="${title}">`
                    }
                    ${videoIndicator}
                    <div class="media-overlay">
                        <button class="btn-icon edit-btn" title="Edit" onclick="editMedia(this)">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon delete-btn" title="Delete" onclick="deleteMedia(this)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="media-info">
                    <h4>${title}</h4>
                    <p>${category.charAt(0).toUpperCase() + category.slice(1)} • ${mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}</p>
                </div>
            `;
            
            mediaGrid.appendChild(mediaItem);
        };
        reader.readAsDataURL(file);
    }

    // Clear form
    const clearBtn = document.getElementById('clear-form');
    clearBtn.addEventListener('click', clearForm);

    function clearForm() {
        uploadForm.reset();
        selectedFiles = [];
        filePreview.innerHTML = '';
    }

    // Gallery filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter media items
            const mediaItems = document.querySelectorAll('.media-item');
            mediaItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Edit and Delete functions
    window.editMedia = function(button) {
        const mediaItem = button.closest('.media-item');
        const title = mediaItem.querySelector('h4').textContent;
        const category = mediaItem.getAttribute('data-category');
        
        // Populate edit form
        document.getElementById('edit-title').value = title;
        document.getElementById('edit-category').value = category;
        
        // Show modal
        document.getElementById('edit-modal').style.display = 'block';
        
        // Store reference for saving
        window.currentEditItem = mediaItem;
    };

    window.deleteMedia = function(button) {
        if (confirm('Are you sure you want to delete this media item?')) {
            const mediaItem = button.closest('.media-item');
            mediaItem.remove();
            showNotification('Media deleted successfully!', 'success');
        }
    };

    // Modal functionality
    const modal = document.getElementById('edit-modal');
    const closeBtn = modal.querySelector('.close');
    const cancelBtn = document.getElementById('cancel-edit');
    const saveBtn = document.getElementById('save-edit');

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    cancelBtn.addEventListener('click', () => modal.style.display = 'none');
    
    saveBtn.addEventListener('click', function() {
        if (window.currentEditItem) {
            const newTitle = document.getElementById('edit-title').value;
            const newCategory = document.getElementById('edit-category').value;
            
            // Update item
            window.currentEditItem.querySelector('h4').textContent = newTitle;
            window.currentEditItem.setAttribute('data-category', newCategory);
            
            // Update category display
            const categoryText = newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
            const mediaType = window.currentEditItem.getAttribute('data-type');
            const typeText = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
            window.currentEditItem.querySelector('.media-info p').textContent = `${categoryText} • ${typeText}`;
            
            modal.style.display = 'none';
            showNotification('Media updated successfully!', 'success');
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // 360 Photo Viewer functionality for Admin
    let currentRotationAdmin = 0;
    let isDraggingAdmin = false;
    let startXAdmin = 0;
    let currentImageAdmin = '';

    window.open360ViewerAdmin = function(button) {
        const mediaItem = button.closest('.media-item');
        const img = mediaItem.querySelector('img');
        currentImageAdmin = img.src;
        
        document.getElementById('photo-360-image-admin').src = currentImageAdmin;
        document.getElementById('photo-360-modal').style.display = 'block';
        currentRotationAdmin = 0;
        updateRotationDisplayAdmin();
    };

    window.close360ViewerAdmin = function() {
        document.getElementById('photo-360-modal').style.display = 'none';
        currentRotationAdmin = 0;
    };

    function updateRotationDisplayAdmin() {
        const image = document.getElementById('photo-360-image-admin');
        const angleDisplay = document.getElementById('rotation-angle-admin');
        
        if (image && angleDisplay) {
            image.style.transform = `rotate(${currentRotationAdmin}deg)`;
            angleDisplay.textContent = `${currentRotationAdmin}°`;
        }
    }

    function rotatePhotoAdmin(degrees) {
        currentRotationAdmin = (currentRotationAdmin + degrees) % 360;
        if (currentRotationAdmin < 0) currentRotationAdmin += 360;
        updateRotationDisplayAdmin();
    }

    // Initialize 360 viewer controls for admin
    const photo360ViewerAdmin = document.getElementById('photo-360-viewer-admin');
    if (photo360ViewerAdmin) {
        // Mouse events for desktop
        photo360ViewerAdmin.addEventListener('mousedown', function(e) {
            isDraggingAdmin = true;
            startXAdmin = e.clientX;
            this.classList.add('dragging');
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDraggingAdmin) return;
            
            const deltaX = e.clientX - startXAdmin;
            const rotationSpeed = 0.5;
            const newRotation = currentRotationAdmin + (deltaX * rotationSpeed);
            
            currentRotationAdmin = newRotation % 360;
            if (currentRotationAdmin < 0) currentRotationAdmin += 360;
            
            updateRotationDisplayAdmin();
            startXAdmin = e.clientX;
        });

        document.addEventListener('mouseup', function() {
            if (isDraggingAdmin) {
                isDraggingAdmin = false;
                const viewer = document.getElementById('photo-360-viewer-admin');
                if (viewer) viewer.classList.remove('dragging');
            }
        });

        // Touch events for mobile
        photo360ViewerAdmin.addEventListener('touchstart', function(e) {
            isDraggingAdmin = true;
            startXAdmin = e.touches[0].clientX;
            e.preventDefault();
        });

        document.addEventListener('touchmove', function(e) {
            if (!isDraggingAdmin) return;
            
            const deltaX = e.touches[0].clientX - startXAdmin;
            const rotationSpeed = 0.5;
            const newRotation = currentRotationAdmin + (deltaX * rotationSpeed);
            
            currentRotationAdmin = newRotation % 360;
            if (currentRotationAdmin < 0) currentRotationAdmin += 360;
            
            updateRotationDisplayAdmin();
            startXAdmin = e.touches[0].clientX;
            e.preventDefault();
        });

        document.addEventListener('touchend', function() {
            if (isDraggingAdmin) {
                isDraggingAdmin = false;
                const viewer = document.getElementById('photo-360-viewer-admin');
                if (viewer) viewer.classList.remove('dragging');
            }
        });
    }

    // Rotation button controls for admin
    const rotateLeftBtnAdmin = document.getElementById('rotate-left-admin');
    const rotateRightBtnAdmin = document.getElementById('rotate-right-admin');
    
    if (rotateLeftBtnAdmin) {
        rotateLeftBtnAdmin.addEventListener('click', function() {
            rotatePhotoAdmin(-15);
        });
    }
    
    if (rotateRightBtnAdmin) {
        rotateRightBtnAdmin.addEventListener('click', function() {
            rotatePhotoAdmin(15);
        });
    }

    // Close modal when clicking outside
    const photo360ModalAdmin = document.getElementById('photo-360-modal');
    if (photo360ModalAdmin) {
        photo360ModalAdmin.addEventListener('click', function(e) {
            if (e.target === this) {
                close360ViewerAdmin();
            }
        });
    }

    // Initialize with sample data loaded
    console.log('Admin panel loaded successfully!');
});
