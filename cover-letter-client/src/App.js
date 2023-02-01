import { useState } from "react";

function App() {
  const [coverLetter, setCoverLetter] = useState(
    "Cover letter text will appear here!"
  );

  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `Please write a cover for me; I'm ${formData.name}. I'm a ${
      formData.position
    } with experience in ${
      formData.skills
    } and I'm seeking for a position as a ${formData.position} at ${
      formData.companyName
    }. I've been working for ${+formData.experience} years.`;

    const response = await fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const parsedData = data.coverLetter.trim();

      let i = 0;
      const typingInterval = setInterval(() => {
        setCoverLetter(parsedData.slice(0, i));
        i++;
        if (i > parsedData.length) {
          clearInterval(typingInterval);
        }
      }, 30);
    }
  };

  const changeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className="container mx-auto">
      <div>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="email">Company Name</label>
              <input
                onChange={changeHandler}
                id="companyName"
                type="text"
                className="w-full mt-1 rounded-sm border border-gray-400 p-3 pr-12 text-sm shadow-sm"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label htmlFor="email">Position</label>
              <input
                onChange={changeHandler}
                id="position"
                type="text"
                className="w-full mt-1 rounded-sm border border-gray-400 p-3 pr-12 text-sm shadow-sm"
                placeholder="Position"
              />
            </div>
            <div>
              <label htmlFor="email">Experience In Year</label>
              <input
                onChange={changeHandler}
                id="experience"
                type="number"
                className="w-full mt-1 rounded-sm border border-gray-400 p-3  text-sm shadow-sm"
                placeholder="Experience"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="email">Skills (CSV)</label>
              <input
                onChange={changeHandler}
                id="skills"
                type="text"
                className="w-full mt-1 rounded-sm border border-gray-400 p-3  text-sm shadow-sm"
                placeholder="Skills"
              />
            </div>
            <div className="">
              <label htmlFor="email">Your Name</label>
              <input
                onChange={changeHandler}
                id="name"
                type="text"
                className="w-full mt-1 rounded-sm border border-gray-400 p-3  text-sm shadow-sm"
                placeholder="Your Name"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 py-3 px-4 mt-4 uppercase text-white"
          >
            Generate Now!
          </button>
        </form>
      </div>

      <div className="mt-6">{coverLetter}</div>
    </div>
  );
}

export default App;
