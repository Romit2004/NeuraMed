import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
dataset = pd.read_csv("heart_disease_data.csv")

# Split data into predictors and target
predictors = dataset.drop("target", axis=1)
target = dataset["target"]

# Train-test split
X_train, X_test, Y_train, Y_test = train_test_split(predictors, target, test_size=0.20, random_state=0)

# Train RandomForest model
rf = RandomForestClassifier(random_state=323)
rf.fit(X_train, Y_train)

# Make predictions and evaluate accuracy
Y_pred_rf = rf.predict(X_test)
test_data_accuracy = accuracy_score(Y_pred_rf, Y_test)
print(f"Model accuracy: {test_data_accuracy}")

# Save the model
joblib.dump(rf, 'heart_disease_model.pkl')

# Example input for testing
input_data = (62, 0, 0, 140, 268, 0, 0, 160, 0, 3.6, 0, 2, 2)
input_data_as_numpy_array = np.asarray(input_data)
input_data_reshaped = input_data_as_numpy_array.reshape(1, -1)

# Make a single prediction
prediction = rf.predict(input_data_reshaped)
print(f"Prediction: {prediction}")

if prediction[0] == 0:
    print('The person does not have heart disease')
else:
    print('The person has heart disease')
