import css from './ContactForm.module.css';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const ContactsBoxSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too short!')
    .max(50, 'Too long!')
    .required('Required!'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, {
      message: 'Invalid number',
      excludeEmptyString: false,
    })
    // .min(3, 'Too short!')
    // .max(50, 'Too long!')
    .required('Required!'),
});

const initialValues = {
  name: '',
  number: '',
};

const ContactForm = ({ onAddNewContact }) => {
  const handleSubmit = (data, formActions) => {
    onAddNewContact(data);
    formActions.resetForm();
  };

  return (
    <Formik
      validationSchema={ContactsBoxSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.contactForm}>
        <label className={css.labelForm}>
          <span className={css.labelText}>Name</span>
          <Field
            className={css.formField}
            placeholder="Anna Rychkova"
            type="text"
            name="name"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>

        <label className={css.labelForm}>
          <span className={css.labelText}>Number</span>
          <Field
            className={css.formField}
            placeholder="459-12-56"
            type="text"
            name="number"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
        </label>

        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
