'use client';

import { useEffect, useState } from 'react';
import {
  getSiteBanner,
  updateSiteBanner,
} from '@/lib/db';
import { supabase } from '@/lib/supabase';

export default function BannerSettings() {
  const [homeImage, setHomeImage] = useState('');
const [aboutImage, setAboutImage] = useState('');

const [homeFile, setHomeFile] = useState<File | null>(null);
const [aboutFile, setAboutFile] = useState<File | null>(null);
  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const home = await getSiteBanner('home');
    const about = await getSiteBanner('about');

    if (home) setHomeImage(home.image_url);
    if (about) setAboutImage(about.image_url);
  }
  async function uploadBanner(
  file: File,
  fileName: string
) {
  const extension = file.name.split(".").pop();

  const path = `${fileName}.${extension}`;

  const { error } = await supabase.storage
    .from("hero")
    .upload(path, file, {
      upsert: true,
    });

  if (error) {
  console.error("Storage Error:", error);
  alert(JSON.stringify(error));
  throw error;
}

  const { data } = supabase.storage
    .from("hero")
.getPublicUrl(path);

  return data.publicUrl;
}

  async function save() {

  alert("Save button clicked");

  try {

    let homeUrl = homeImage;
    let aboutUrl = aboutImage;
    alert("Step 1");

    // rest of your code...

    // Upload About Hero
    if (aboutFile) {
      aboutUrl = await uploadBanner(
        aboutFile,
        "about-hero"
      );
    }

    // Save URLs in database
    await updateSiteBanner("home", homeUrl);
    await updateSiteBanner("about", aboutUrl);

    // Update preview
    setHomeImage(homeUrl);
    setAboutImage(aboutUrl);

    alert("Banner images updated successfully!");

  } catch (err) {

    console.error(err);

    alert("Image upload failed.");

  }
}

  return (
    <div className="bg-white rounded-2xl border p-8">

      <h1 className="text-2xl font-bold mb-8">
        Hero & Banner Images
      </h1>

      <div className="space-y-8">

        <div>
          <label className="block font-semibold mb-2">
            Homepage Hero Image
          </label>

          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setHomeFile(e.target.files[0]);
    }
  }}
  className="w-full border rounded-xl px-4 py-3"
/>

          {homeImage && (
            <img
              src={homeImage}
              className="mt-4 rounded-xl border w-full max-w-lg"
            />
          )}
        </div>

        <div>
          <label className="block font-semibold mb-2">
            About Page Hero Image
          </label>

          <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files?.[0]) {
      setAboutFile(e.target.files[0]);
    }
  }}
  className="w-full border rounded-xl px-4 py-3"
/>

          {aboutImage && (
            <img
              src={aboutImage}
              className="mt-4 rounded-xl border w-full max-w-lg"
            />
          )}
        </div>

        <button
          onClick={save}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
        >
          Save Banner Images
        </button>

      </div>

    </div>
  );
}