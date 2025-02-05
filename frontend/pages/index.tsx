import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/layout';
import { FormData } from '@/components/types/types';
import TextInput from '@/components/text_input';

export default function Home() {
  const [resumeData, setResumeData] = useState<FormData>({
    file: null,
    text: '',
  });
  const [jobDescriptionData, setJobDescriptionData] = useState<FormData>({
    file: null,
    text: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log(resumeData);
      console.log(jobDescriptionData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFilled = Boolean(
    (resumeData.file || resumeData.text) &&
    (jobDescriptionData.file || jobDescriptionData.text)
  );

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-max py-10 px-4 sm:px-6 lg:px-8"
      >
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-white">
              Upload your resume and a job description to get suggestions on how to better match the job description!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TextInput
              formData={resumeData}
              setFormData={setResumeData}
              name="Resume"
              type="file"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TextInput
              formData={jobDescriptionData}
              setFormData={setJobDescriptionData}
              name="Job Description"
              type="text"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className={`
                relative
                w-full py-4 px-6
                rounded-xl
                font-medium
                transition-all duration-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${isFormFilled && 'bg-secondary hover:opacity-80'}
                ${isFormFilled ? 'text-white' : 'text-primary'}
                border border-primary
                hover:border-opacity-50
                focus:outline-none
                focus:ring-2
                focus:ring-opacity-50
                focus:ring-primary
                focus:ring-offset-2
                focus:ring-offset-background
                group
              `}
            >
              <span className={`
                flex items-center justify-center gap-2
                transition-all duration-300
                ${isSubmitting ? 'opacity-0' : 'opacity-100'}
              `}>
                {isFormFilled ? 'Analyze Resume' : 'Fill both fields to continue'}
              </span>
              {isSubmitting && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin" />
                </span>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </Layout>
  );
}
