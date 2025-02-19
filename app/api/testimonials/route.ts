import { database } from '@/app/firebase'; // Adjust the import based on your project structure
import { ref, get } from 'firebase/database';

interface Testimonial {
  id: string; // Adjust based on your data structure
  message: string;
  author: string;
}

const fetchTestimonials = async (): Promise<Testimonial[] | null> => {
  try {
    const testimonialsRef = ref(database, 'data'); // Adjust the path as needed
    const snapshot = await get(testimonialsRef);

    if (snapshot.exists()) {
      return snapshot.val() as Testimonial[]; // Cast to Testimonial array
    } else {
      console.log('No testimonials found');
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching testimonials:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    return null; // Return null or handle the error as needed
  }
};

// Usage example
fetchTestimonials().then(data => {
  console.log("Testimonials:", data);
});