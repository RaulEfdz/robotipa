import { supabase } from "../supabaseClient";

// Fetch Hero Content (only one row expected)
export async function fetchHeroContent() {
  const { data, error } = await supabase
    .from("hero_content")
    .select("*")
    .limit(1)
    .single();
  if (error) throw error;
  return data;
}

// Fetch Services with features and company sizes
export async function fetchServices(): Promise<any[]> {
  const { data: services, error } = await supabase.from("services").select("*");
  if (error) throw error;

  // Fetch features and company sizes for all services
  const serviceIds = services!.map((s: any) => s.id);

  const { data: features, error: featuresError } = await supabase
    .from("service_features")
    .select("*")
    .in("service_id", serviceIds);
  if (featuresError) throw featuresError;

  const { data: companySizes, error: sizesError } = await supabase
    .from("service_company_sizes")
    .select("*")
    .in("service_id", serviceIds);
  if (sizesError) throw sizesError;

  // Map features and company sizes to services
  const servicesWithDetails = services!.map((service: any) => ({
    ...service,
    features: features!
      .filter((f: any) => f.service_id === service.id)
      .map((f: any) => f.feature),
    companySizeCompatibility: companySizes!
      .filter((c: any) => c.service_id === service.id)
      .map((c: any) => c.company_size),
  }));

  return servicesWithDetails;
}

// Fetch Success Stories with impacts, technologies, and testimonials
export async function fetchSuccessStories(): Promise<any[]> {
  const { data: stories, error } = await supabase
    .from("success_stories")
    .select("*");
  if (error) throw error;

  const storyIds = stories!.map((s: any) => s.id);

  const { data: impacts, error: impactsError } = await supabase
    .from("success_story_impacts")
    .select("*")
    .in("success_story_id", storyIds);
  if (impactsError) throw impactsError;

  const { data: technologies, error: techError } = await supabase
    .from("success_story_technologies")
    .select("*")
    .in("success_story_id", storyIds);
  if (techError) throw techError;

  const { data: testimonials, error: testError } = await supabase
    .from("testimonials")
    .select("*")
    .in("success_story_id", storyIds);
  if (testError) throw testError;

  // Map related data to stories
  const storiesWithDetails = stories!.map((story: any) => ({
    ...story,
    impact: impacts!.filter((i: any) => i.success_story_id === story.id),
    technologies: technologies!
      .filter((t: any) => t.success_story_id === story.id)
      .map((t: any) => t.technology),
    testimonial:
      testimonials!.find((t: any) => t.success_story_id === story.id) || null,
  }));

  return storiesWithDetails;
}

// Fetch Plans with features
export async function fetchPlans(): Promise<any[]> {
  const { data: plans, error } = await supabase.from("plans").select("*");
  if (error) throw error;

  const planIds = plans!.map((p: any) => p.id);

  const { data: features, error: featuresError } = await supabase
    .from("plan_features")
    .select("*")
    .in("plan_id", planIds);
  if (featuresError) throw featuresError;

  const plansWithFeatures = plans!.map((plan: any) => ({
    ...plan,
    features: features!
      .filter((f: any) => f.plan_id === plan.id)
      .map((f: any) => f.feature),
  }));

  return plansWithFeatures;
}

// Fetch Resources
export async function fetchResources() {
  const { data, error } = await supabase.from("resources").select("*");
  if (error) throw error;
  return data;
}
