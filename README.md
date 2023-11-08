# SkillHub Web Application

SkillHub is a web application designed to facilitate job browsing and bidding within the fields of web development, digital marketing, and graphic design. Users can explore job categories, add job listings, manage their posted jobs, and handle bidding requests. The application leverages React for the front-end and MongoDB for the database management.

## Features

1. **Browse Jobs by Category:** Users can conveniently navigate through job categories such as web development, digital marketing, and graphic design, each displaying a minimum of four cards. Job details include the title, deadline, price range, and a brief description, with a "Bid Now" button for placing bids.
2. **Job Details Page:** Upon clicking the "Bid Now" button, users are redirected to the job details page (/jobs/:id), where they can view detailed information about the job. A bidding form is provided, allowing users to enter their bid details. The form includes fields for the bidding price, deadline, and their email. Users cannot bid on their own posted jobs.
3. **Add Jobs Page:** Users can add job listings by filling out a form that includes fields such as the employer's email (automatically populated), job title, deadline, description, category, minimum and maximum price. Upon submission, the data is stored in the MongoDB database, and a toast notification is displayed to confirm the successful addition of the job.
4. **My Posted Jobs Page:** This page allows users to view all the jobs they have added. Each job card features an update and delete button, enabling users to edit or remove their posted jobs. The update functionality is presented in a modal or another route, while a confirmation is required before deleting a job.
5. **My Bids Page:** Users can access a comprehensive overview of their bid information from the job details page. The table format displays details such as job title, email, deadline, and status. Users can mark a job as complete if the bid is accepted, thereby updating the status and removing the complete button.

## Links

- [Live Link of SkillHub Web Application](https://skillhub-d14ce.web.app/)