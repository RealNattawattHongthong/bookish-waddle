import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np

# Load the pre-trained model
def load_pretrained_model(model_path):
    model = load_model(model_path)
    return model

# Process the uploaded photo and return the infection status
def predict_infection_status(model, img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    prediction = model.predict(img_array)
    infection_status = 'Infected' if prediction[0][0] > 0.5 else 'Not Infected'
    return infection_status

# Example usage
if __name__ == "__main__":
    model_path = 'path/to/your/pretrained/model.h5'
    img_path = 'path/to/uploaded/photo.jpg'

    model = load_pretrained_model(model_path)
    status = predict_infection_status(model, img_path)
    print(f'The photo is {status}')
