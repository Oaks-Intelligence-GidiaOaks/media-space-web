import React, { useEffect, useState } from "react";
import upload from "../../assets/upload.png";
import {
  useGetCategoryQuery,
  useToggleCategoryByIdMutation,
} from "../../service/category.service";
import PaginationControls from "../ui/PaginationControls";
import { CategoryCard } from "../layout/super-admin-layout";
import { ShimmerThumbnail } from "react-shimmer-effects";
// import Modals from "../modals/Modal";
import Modals from "./../modals/Modal";
import { showAlert } from "../../static/alert";
import { useSelector } from "react-redux";
import axios from "axios";
import { useToggleAdvertByIdMutation } from "../../service/admin/advert.service";

const CreateCategory = () => {
  const {
    data: categoryData,
    isLoading: loadCategory,
    refetch: refetchCategory,
  } = useGetCategoryQuery();

  const token = useSelector((state) => state.user?.token);

  const [photo, setPhoto] = useState(null);
  const [openCreateCategory, setOpenCreatecategory] = useState(false);
  const [categoryName, setCategoryName] = useState(null);
  const [categoryVisibility, setCategoryVisibility] = useState("");
  const [categoryPageLink, setCategoryPageLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [previewSrc, setPreviewSrc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const category = categoryData?.data?.filter((fl) => {
      if (selectedCategory.toLocaleLowerCase().includes("all cat")) {
        return fl;
      } else if (
        fl.visibility
          .toLocaleLowerCase()
          .includes(selectedCategory.toLocaleLowerCase())
      ) {
        return fl;
      }
    });
    setCategory(category);
  }, [selectedCategory, categoryData]);

  // console.log(adverts);

  // console.log(categoryData?.data);
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // console.log(categoryData?.data);
  // const itemsPerPage = 5;
  // const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {}, [userData]);

  const totalPages = Math.ceil(category?.length / itemsPerPage);

  const currentCategoryList = category?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [toggleCategory, { isSuccess, error }] =
    useToggleCategoryByIdMutation();

  const handleToggle = async (catId) => {
    console.log(catId);
    try {
      await toggleCategory(catId);
      refetchCategory();
      console.log("Category toggled successfully");
    } catch (error) {
      console.error("Error deleting Category:", error);
    }
  };

  const onSubmitCategory = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.log("Clicked");
    const formData = new FormData();

    // console.log(photo, categoryName, categoryVisibility, categoryPageLink);

    if (!photo || !categoryName || !categoryVisibility) {
      setSubmitting(false);
      return;
    }
    // Append other values to formData
    formData.append("name", categoryName);
    formData.append("visibility", categoryVisibility);
    if (categoryPageLink) {
      formData.append("category_page_link", categoryPageLink);
    }

    // Append media file to formData
    formData.append("photo", photo);

    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.post(
        `${apiUrl}/admin/user/category/single`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Category Created successfully:", response.data);
      showAlert("Great", "Category created successfully", "success");
      setOpenCreatecategory(false);
      setCategoryName("");
      setCategoryPageLink("");
      setCategoryVisibility("");
      setPhoto(null);
      setPreviewSrc(null);
      refetchCategory();
      setSubmitting(false);
    } catch (error) {
      console.error("Error Creating Category:", error.response.data.message);
      setSubmitting(false);
      showAlert("", error.response.data.message, "error");
    }
  };

  // Delete Category
  const onDeleteCategory = async (id) => {
    // console.log(id);
    // e.preventDefault();
    setSubmitting(true);
    const apiUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

    try {
      const response = await axios.delete(
        `${apiUrl}/admin/user/category/${id}`,
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Category Deleted successfully:", response.data);
      showAlert("Deleted", "Category deleted successfully", "success");
      refetchCategory();
      setSubmitting(false);
    } catch (error) {
      console.error("Error Creating Category:", error.response.data.message);
      setSubmitting(false);
      showAlert("", error.response.data.message, "error");
      // setOpenCreatecategory(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      previewImage(file);
    }
  };

  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewSrc(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="mb-4 flex flex-col">
          <select
            name="visibility"
            id="visibility"
            component="select"
            type="text"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            className="h-[38px] focus:outline-none focus:ring-0 ad-input"
          >
            <option value="All Categories">All Categories</option>
            <option value="Public">Public</option>
            <option value="Staff">Staff</option>
            <option value="Subscribers">Subscribers</option>
            <option value="Followers">Followers</option>
          </select>
        </div>
        <div>
          <button
            className="ads-btn mr-5"
            onClick={() => setOpenCreatecategory(true)}
          >
            Create Category
          </button>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap">
        {category && category.length > 0 ? (
          [...currentCategoryList]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((cat, id) =>
              loadCategory ? (
                <ShimmerThumbnail key={id} width={362} height={269} />
              ) : (
                <CategoryCard
                  key={id}
                  tag={cat?.visibility || "public"}
                  title={cat?.name}
                  media={cat?.photo_url}
                  id={cat._id}
                  ondelete={onDeleteCategory}
                  status={cat.status === "active" ? true : false}
                  onToggle={(isChecked) => handleToggle(cat._id, isChecked)}
                />
              )
            )
        ) : (
          <p className="flex justify-center text-lg">
            Resource is still loading or No data available
          </p>
        )}
      </div>
      <div className="mt-5">
        {category && category.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
      {/*  category modal */}
      <Modals
        title="Create category"
        openModal={openCreateCategory}
        modalSize="xl"
        onClose={() => setOpenCreatecategory(false)}
      >
        <form onSubmit={onSubmitCategory}>
          <div className="mb-4 flex flex-col">
            <label className="cursor-pointer">
              <img src={previewSrc || upload} alt="" />

              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>
          <div className="mb-4 flex flex-col">
            <label className="badge-label cursor-pointer pb-2">
              Upload File
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                // className="hidden w-[100px] h-[100px]"
              />
            </label>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Title
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              type="text"
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Visibility
            </label>
            <select
              name="visibility"
              id="visibility"
              component="select"
              value={categoryVisibility}
              onChange={(e) => setCategoryVisibility(e.target.value)}
              type="text"
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
            >
              <option value="">select</option>
              <option value="Public">Public</option>
              <option value="Staff">Staff</option>
              <option value="Subscribers">Subscribers</option>
              <option value="Followers">Followers</option>
            </select>
          </div>

          <div className=" flex flex-col">
            <label htmlFor="department" className="badge-label pb-2">
              Category page link
            </label>

            <input
              value={categoryPageLink}
              onChange={(e) => setCategoryPageLink(e.target.value)}
              className="h-[38px] focus:outline-none focus:ring-0 ad-input"
              type="text"
            />
          </div>

          <div className="flex items-center gap-5 justify-end pt-5 mt-8 pb-5">
            <p
              onClick={() => setOpenCreatecategory(false)}
              className="bg-white cursor-pointer p-2 rounded-3xl px-4 font-semibold border-[1px] border-black"
            >
              Cancel
            </p>
            <button type="submit" className="badge-create">
              {submitting ? (
                <>
                  <span className="loading-dots">
                    <span className="loading-dots-dot"></span>
                    <span className="loading-dots-dot"></span>
                    <span className="loading-dots-dot"></span>
                  </span>
                </>
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </Modals>
    </>
  );
};

export default CreateCategory;
