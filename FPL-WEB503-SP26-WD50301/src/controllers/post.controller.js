import Post from "../models/post";
import Joi from "joi";

//  Joi Valid
const postValidator = Joi.object({
  title: Joi.string()
    .required()
    .messages({ "string.empty": "Tiêu đề không được để trống" }),
  content: Joi.string()
    .required()
    .messages({ "string.empty": "Nội dung không được để trống" }),
  author: Joi.string()
    .required()
    .messages({ "string.empty": "Tác giả không được để trống" }),
});

// Lấy danh sách + Giới hạn Sắp xếp
export const getPosts = async (req, res) => {
  try {
    const { _limit = 10, _sort = "createdAt", _order = "desc" } = req.query;

    const options = {
      limit: parseInt(_limit),
      sort: {
        [_sort]: _order === "desc" ? 1 : -1,
      },
    };

    const posts = await Post.find().limit(options.limit).sort(options.sort);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Lấy chi tiết
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ message: "Không tìm thấy bài viết" });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Thêm bài viết
export const createPost = async (req, res) => {
  try {
    const { error } = postValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ messages: errors });
    }
    const newPost = await Post.create(req.body);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Cập nhật
export const updatePost = async (req, res) => {
  try {
    const { error } = postValidator.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ messages: errors });
    }
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost)
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết để cập nhật" });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Xóa
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res
        .status(404)
        .json({ message: "Không tìm thấy bài viết để xóa" });
    return res.status(200).json({ message: "Đã xoá thành công" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
