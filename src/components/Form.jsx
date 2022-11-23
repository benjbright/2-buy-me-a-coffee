const Input = ({ placeholder, type, name, handleChange, value }) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      onChange={(e) => handleChange(e, name)}
      className=""
      value={value}
    />
  )
}

const Form = ({ handleChange, handleSubmit, formData }) => {
  // const onSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(e.target.value)
  // }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="form">
      <div>
        <label htmlFor="name">Name</label>
        <input
          placeholder="Name"
          id="name"
          type="text"
          // name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="message">Message</label>
        <input
          placeholder="Message"
          id="message"
          type="text"
          // name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* <Input
        placeholder="Name"
        name="name"
        value={formData.name}
        handleChange={handleChange}
      /> */}
      {/* <Input
        placeholder="Message"
        name="message"
        value={formData.message}
        handleChange={handleChange}
      /> */}
      <button type="submit">Buy me a coffee!</button>
    </form>
  )
}
export default Form
