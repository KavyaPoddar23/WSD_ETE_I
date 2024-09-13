document.addEventListener('DOMContentLoaded', () => {
    const courseDetails = document.getElementById('course-details');

    async function fetchCourseDetails() {
        try {
            const response = await fetch('https://raw.githubusercontent.com/KavyaPoddar23/WSD_ETE_I/main/courses.json'); 
            const courses = await response.json();
            courseDetails.innerHTML = courses.map(course => `
                <div>
                    <h2>${course.title}</h2>
                    <p>Instructor: ${course.instructor}</p>
                    <p>Duration: ${course.duration}</p>
                    <p>Rating: ${course.rating}</p>
                    <p>Category: ${course.category}</p>
                    <p>Price: ${course.price}</p>
                    <p>Enrolled: ${course.enrolled}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    }

    fetchCourseDetails();
});
