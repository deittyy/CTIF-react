const SizeGuide = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content size-guide-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Size Guide (inches)</h3>
        <table className="size-guide-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S</td>
              <td>34-36</td>
              <td>28-30</td>
              <td>28</td>
            </tr>
            <tr>
              <td>M</td>
              <td>38-40</td>
              <td>32-34</td>
              <td>29</td>
            </tr>
            <tr>
              <td>L</td>
              <td>42-44</td>
              <td>36-38</td>
              <td>30</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>46-48</td>
              <td>40-42</td>
              <td>31</td>
            </tr>
          </tbody>
        </table>
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SizeGuide;
