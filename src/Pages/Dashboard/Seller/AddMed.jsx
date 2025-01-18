import { Helmet } from 'react-helmet-async'
import AddMedForm from './../../../Component/Form/AddMedForm';

const AddMed = () => {
  return (
    <div>
      <Helmet>
        <title>Add Plant | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddMedForm />
    </div>
  )
}

export default AddMed