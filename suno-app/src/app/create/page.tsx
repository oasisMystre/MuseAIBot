import { useState } from "react";
import { toast } from "react-toastify";
import { MdMusicNote, MdQuestionMark } from "react-icons/md";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, boolean } from "yup";

import { useAppDispatch } from "../../store";
import { libraryActions } from "../../store/slices/librarySlice";

import { useApi } from "../../composables/useApi";
import { LibraryAndAudioInfo } from "../../lib/api/models";

import CheckBox from "../../components/elements/CheckBox";
import MusicDetailDialog from "../../components/MusicDetailDialog";

export default function CreatePage() {
  const api = useApi();
  const dispatch = useAppDispatch();
  const [createdLibrary, setCreatedLibrary] =
    useState<LibraryAndAudioInfo | null>(null);

  const validateYupSchema = object().shape({
    isInstrumental: boolean(),
    prompt: string().trim().min(6).required(),
    title: string().trim().min(5).optional(),
    tags: string().trim().min(4).optional(),
  });

  return (
    <>
      <main className="flex-1 flex flex-col">
        <main className="flex flex-col space-y-8 p-4 md:self-center md:min-w-xl">
          <header>
            <h1 className="text-xl font-bold">Create</h1>
          </header>
          <Formik
            validationSchema={validateYupSchema}
            initialValues={{ isInstrumental: false, prompt: "" }}
            onSubmit={async (values, { setSubmitting }) => {
              await toast.promise(
                api.library
                  .createLibrary(Object.assign(values, { waitAudio: true }))
                  .then(({ data }) => {
                    setCreatedLibrary(data.at(0)!);
                    dispatch(libraryActions.addMany(data));
                  })
                  .catch((error) => {
                    console.log(error);
                    return Promise.reject(error);
                  })
                  .finally(() => setSubmitting(true)),
                {
                  pending: "Generating music, please wait a moment.",
                  success: "Music generated succesfully.",
                  error: "Unable to process music generation.",
                }
              );
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form className="flex flex-col space-y-8">
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <label className="flex items-center space-x-2">
                      <span>Title</span>
                      <MdQuestionMark />
                    </label>
                    <Field
                      name="title"
                      className="input-border input-focus"
                      placeholder="Enter a title"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="text-sm">Song Description</label>
                    <Field
                      as="textarea"
                      name="prompt"
                      className="input-border input-focus"
                      placeholder="Enter Song description"
                    />
                    <small className="text-red-500 first-letter:capitalize">
                      <ErrorMessage name="prompt" />
                    </small>
                  </div>
                  <CheckBox name="isInstrumental">
                    <span>Instrumental</span>
                  </CheckBox>
                </div>
                <button
                  disabled={isSubmitting}
                  className="flex items-center justify-center bg-white text-black py-2 rounded-md hover:bg-green-500/80 active:bg-green-500"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-3 border-t-transparent border-black rounded-full animate-spin" />
                  ) : (
                    <div className="flex space-x-2 items-center justify-center">
                      <span>Create</span>
                      <MdMusicNote className="text-xl" />
                    </div>
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </main>
      </main>
      {createdLibrary && (
        <MusicDetailDialog
          library={createdLibrary}
          onClose={() => setCreatedLibrary(null)}
        />
      )}
    </>
  );
}
