import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { styles } from '../styles';
import { TypewriterCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { useTranslation } from 'react-i18next';

const Contact = ({ activeMediaQuery }) => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [mailStatus, setMailStatus] = useState(false);

  const isValidName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name) && name.replace(/\s+/g, '').length >= 2;
  };
  const isValidCompany = (name) => {
    // Check against characters from Part 2 of The Company Regulations
    const mainRegex = /^[a-zA-ZÀ-Žà-ž0-9&@$£€¥.,:;’'“”‘’!?"*=%+#%]*$/;

    // Check the first three characters for restricted symbols
    const firstThreeRegex = /^[*=%+#%]{1,3}/;

    // Check if the name has more than two characters
    if (name.length <= 2) {
      return false;
    }

    // Return false if the name violates any of the rules
    if (!mainRegex.test(name) || firstThreeRegex.test(name)) {
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const isValidMessage = (message) => {
    return message.length >= 20;
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.name === '' && form.email === '' && form.message === '') {
      alert(t('contact.alertEmptyFields'));
      return;
    }

    if (!isValidName(form.name)) {
      alert(t('contact.alertName'));
      return;
    }

    if (!isValidCompany(form.company)) {
      alert(
        "The company name you've entered does not conform to the accepted naming standards."
      );
      return;
    }

    if (!isValidEmail(form.email)) {
      alert(t('contact.alertEmail'));
      return;
    }

    if (!isValidMessage(form.message)) {
      alert(t('contact.alertMessage'));
      return;
    }

    setMailStatus(true);

    setLoading(true);

    emailjs
      .send(
        'service_q584fja',
        'template_rfzq5zq',
        {
          from_name: form.name,
          to_name: 'Kasper Borgbjerg',
          from_company: form.company,
          from_email: form.email,
          to_email: 'sujata@jsmastery.pro',
          message: form.message,
        },
        'qxrDtXj7JPYVLiaFF'
      )
      .then(
        () => {
          setLoading(false);
          setTimeout(() => setMailStatus(false), 5000);
          alert(t('contact.confirmation'));

          setForm({
            name: '',
            company: '',
            email: '',
            message: '',
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          setMailStatus(false); // Reset mailStatus on error
          alert(t('contact.errormessage'));
        }
      );
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden mb-20`}
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='flex-[0.75] bg-primary rounded-2xl '
      >
        <p className={styles.sectionSubText}>{t('contact.p')}</p>
        <h3 className={styles.sectionHeadText}>{t('contact.h2')}</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='garet-book text-[14px] font-medium mobile:mb-2 mb-4'>
              {t('contact.inputName')}
            </span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('contact.inputNamePlaceholder')}
              className='bg-grey-10 py-4 px-6 placeholder:lightblack placeholder:font-garet-book outline-none border-none text-[14px] font-medium lg:min-w-[400px]'
            />
          </label>

          <label className='flex flex-col'>
            <span className='garet-book text-[14px] font-medium mobile:mb-2 mb-4'>
              {t('contact.inputCompany')}
            </span>
            <input
              type='company'
              name='company'
              value={form.company}
              onChange={handleChange}
              placeholder={t('contact.inputCompanyPlaceholder')}
              className='bg-grey-10 py-4 px-6 placeholder:lightblack placeholder:font-garet-book outline-none border-none text-[14px] font-medium lg:min-w-[400px]'
            />
          </label>

          <label className='flex flex-col'>
            <span className='garet-book text-[14px] font-medium mobile:mb-2 mb-4'>
              {t('contact.inputEmail')}
            </span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('contact.inputEmailPlaceholder')}
              className='bg-grey-10 py-4 px-6 placeholder:lightblack placeholder:font-garet-book outline-none border-none text-[14px] font-medium lg:min-w-[400px]'
            />
          </label>
          <label className='flex flex-col'>
            <span className='garet-book text-[14px] font-medium mobile:mb-2 mb-4'>
              {t('contact.inputMessage')}
            </span>
            <textarea
              rows={4}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('contact.inputMessagePlaceholder')}
              className='bg-grey-10 py-4 px-6 placeholder:lightblack placeholder:font-garet-book  outline-none border-none text-[14px] font-medium lg:min-w-[400px]'
            />
          </label>

          <button
            type='submit'
            className='garet-book bg-secondary py-3 px-8 outline-none w-fittext-[14px] text-white font-bold shadow-md'
          >
            {loading ? t('contact.sendButtonLoading') : t('contact.sendButton')}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <TypewriterCanvas
          activeMediaQuery={activeMediaQuery}
          mailStatus={mailStatus}
        />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
