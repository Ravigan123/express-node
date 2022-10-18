const Course = require("../models/Course");
const CourseUser = require("../models/CourseUser");

class CourseController {
	async addCourse(req, res) {
		let newCourse;

		// const id_user = parseInt(req.session.user);
		const id_user = 1;
		const id_course = parseInt(req.body.course);

		try {
			newCourse = await CourseUser.query().insert({
				id_user,
				id_course,
			});
		} catch (err) {
			return res.status(422).json({ message: err.message });
		}
		res.status(200).json(newCourse);
	}
	async getCourse(req, res) {
		const course = await Course.query()
			.select("courses.name_course", "courses.code")
			.innerJoin("course_users", "courses.id", "course_users.id_course")
			.innerJoin("users", "users.id", "course_users.id_user")
			.where("id_user", 1);

		res.status(200).json(course);
	}
	async updateCourse(req, res) {}
	async deleteCourse(req, res) {
		const courseDelete = await CourseUser.query()
			.delete()
			.where("id_user", 1)
			.where("id", req.params.id);

		res.status(200).json(courseDelete);
	}
}

module.exports = new CourseController();
