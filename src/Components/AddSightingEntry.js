import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreatableSelect, { useCreatable } from "react-select/creatable";

export default function AddSighting() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  const [newCategories, setNewCategories] = useState([]);
  const [intensity, setIntensity] = useState("");
  const [addCategoryMode, setAddCategoryMode] = useState(false);
  const [existingCategories, setExistingCategories] = useState([]);
  const [categoryIntensity, setCategoryIntensity] = useState({});

  let navigate = useNavigate();

  const handleAddSighting = async (e) => {
    e.preventDefault();

    if (newCategories.length) {
      for (let cat of newCategories) {
      }

      let response = await axios.post(
        `${process.env.REACT_APP_API_SERVER}/categories`,
        newCategories
      );
      var newCategoriesIds = response.data;
      // const selectedCategoryIds = selectedCategories.map(({ value }) => value);
    }

    const categoryIds = existingCategories.concat(newCategoriesIds);
    console.log(categoryIds);

    let newSighting = {
      date,
      location,
      notes,
      city,
      country,
      categoryIds,
      intensity,
    };
    let response = await axios.post(
      `${process.env.REACT_APP_API_SERVER}/sightings`,
      newSighting
    );
    console.log("response:", response);

    setDate("");
    setNotes("");
    setLocation("");
    setCity("");
    setCountry("");
    setSelectedCategories([]);
    navigate("/all");
  };

  const selectFieldStyles = {
    option: (provided) => ({
      ...provided,
      color: "black",
    }),
  };

  const getCategories = async (e) => {
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/categories`
    );
    let categories = response.data;
    let categoriesName = categories.map((category) => category.name);
    setCategoriesName(categoriesName);
    setAllCategories(categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryOptions = allCategories.map((category, index) => ({
    // value is what we store
    value: category.id,
    // label is what we display
    label: category.name,
  }));

  const handleSelectChange = async (categories, action) => {
    if (action.action === "create-option") {
      setNewCategories((prev) => [...prev, { name: action.option.value }]);
      console.log(newCategories);
    } else if (
      action.action === "remove-value" &&
      action.removedValue.__isNew__
    ) {
      console.log("did this run?");
      let updateCategory = [...newCategories];
      for (let index in updateCategory) {
        if (updateCategory[index].name === action.removedValue.value) {
          updateCategory.splice(index, 1);
          break;
        }
      }
      setNewCategories(updateCategory);
    } else if (action.action === "select-option") {
      console.log(action);
      setExistingCategories((prev) => [...prev, action.option.value]);
    } else if (action.action === "remove-value") {
      let updateCategory = [...existingCategories];
      for (let index in updateCategory) {
        if (updateCategory[index].name === action.removedValue.label) {
          updateCategory.splice(index, 1);
          break;
        }
        setExistingCategories(updateCategory);
        console.log(action);
      }
    }
    console.log(categories);

    setAddCategoryMode(true);

    setSelectedCategories(categories);
  };

  return (
    <div>
      <form
        onSubmit={handleAddSighting}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="datetime-local"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="what happened?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <input
          type="text"
          placeholder="which city?"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="which country?"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <CreatableSelect
          isMulti
          options={categoryOptions}
          value={selectedCategories}
          onChange={handleSelectChange}
          styles={selectFieldStyles}
        />
        {addCategoryMode ? (
          <input
            type="number"
            placeholder="intensity scale of 1 to 5"
            value={intensity}
            min="1"
            max="5"
            onChange={(e) => setIntensity(e.target.value)}
          />
        ) : null}
        <input type="submit" />
      </form>
    </div>
  );
}
