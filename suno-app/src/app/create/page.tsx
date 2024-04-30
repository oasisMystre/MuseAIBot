import { useState } from "react";
import { toast } from "react-toastify";
import { MdMusicNote, MdQuestionMark } from "react-icons/md";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, boolean, setLocale, array } from "yup";

import { useAppDispatch } from "../../store";
import { libraryActions } from "../../store/slices/librarySlice";

import { useApi } from "../../composables/useApi";
import { LibraryAndAudioInfo } from "../../lib/api/models";

import CheckBox from "../../components/elements/CheckBox";
import MusicDetailDialog from "../../components/MusicDetailDialog";
import IcRandom from "../../assets/ic_random";
import clsx from "clsx";

export default function CreatePage() {
  const api = useApi();
  const dispatch = useAppDispatch();
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [createdLibrary, setCreatedLibrary] =
    useState<LibraryAndAudioInfo | null>(null);

  const validateYupSchema = object().shape({
    isCustom: boolean(),
    isInstrumental: boolean(),
    prompt: string().trim().min(6).required(),
    title: string()
      .trim()
      .min(5)
      .when("isCustom", {
        is: true,
        then: () => string().required(),
        otherwise: () => string().notRequired(),
      }),
    tags: array(string()).optional(),
  });

  return (
    <>
      <main className="flex-1 flex flex-col">
        <main className="flex flex-col space-y-8 p-4 md:self-center md:min-w-xl">
          <Formik
            validationSchema={validateYupSchema}
            initialValues={{
              prompt: "",
              title: "",
              isCustom: false,
              isInstrumental: false,
              tags: [],
            }}
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
            {({ isSubmitting, setFieldValue, values, setFieldError }) => (
              <>
                <header className="flex items-center">
                  <h1 className="flex-1 text-xl font-bold">Create</h1>
                  <CheckBox name="isCustom">
                    <span>Custom Prompt</span>
                  </CheckBox>
                </header>
                <Form className="flex flex-col space-y-8">
                  <div className="flex-1 flex flex-col space-y-4">
                    {values.isCustom && (
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
                        <small className="text-red-500 first-letter:capitalize">
                          <ErrorMessage name="title" />
                        </small>
                      </div>
                    )}
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm">
                        {values.isCustom ? "Lyrics" : "Song Description"}
                      </label>
                      <div className="flex flex-col input-border focus-within:input-focus">
                        <Field
                          as="textarea"
                          name="prompt"
                          className={clsx(
                            "flex-1 bg-transparent focus:outline-none",
                            { "min-h-30": values.isCustom }
                          )}
                          placeholder={
                            values.isCustom
                              ? "Enter your own lyrics..."
                              : "Song Description"
                          }
                        />
                        {values.isCustom && (
                          <button
                            type="button"
                            className="min-w-48 h-10 self-start flex space-x-2 justify-center items-center !bg-stone-700 px-2 py-1 rounded-md cursor-pointer"
                            disabled={lyricsLoading}
                            onClick={async () => {
                              setLyricsLoading(true);

                              await toast
                                .promise(
                                  api.micellenousApi
                                    .generateLyrics("Generate random lyrics")
                                    .then((response) => {
                                      setFieldValue(
                                        "title",
                                        response.data.title
                                      );
                                      setFieldValue(
                                        "prompt",
                                        response.data.text
                                      );
                                    }),
                                  {
                                    pending: "Generating lyrics",
                                    success: "Lyrics generated successfully",
                                    error: "An unexpected error ocurr",
                                  }
                                )
                                .finally(() => setLyricsLoading(false));
                            }}
                          >
                            {lyricsLoading ? (
                              <div className="w-6 h-6 border-3 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <IcRandom className="text-xl" />
                                <span>Use a random Style</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
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
                    className="flex items-center justify-center bg-white text-black py-2 rounded-md hover:bg-green-white/80 active:bg-white"
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
              </>
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
